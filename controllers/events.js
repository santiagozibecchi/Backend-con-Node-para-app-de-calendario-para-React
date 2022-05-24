const { response } = require("express");
const Evento = require("../models/Evento");

// {
//       ok: true,
//       msg: 'mensaje'
// }

const getEventos = async (req, res = response) => {

      const eventos = await Evento.find()
            .populate('user', 'name')

      return res.json({
            ok: true,
            eventos
      })
}

const crearEvento = async (req, res = response) => {

      // verificar que tenga el evento
      // console.log(req.body);
      // console.log(req);

      const evento = new Evento(req.body);


      try {

            // lugar de donde viene el user
            evento.user = req.uid

            const eventoGuardado = await evento.save();

            res.json({
                  ok: true,
                  evento: eventoGuardado
            })

      } catch (error) {
            console.log(error);
            res.status(500).json({
                  ok: false,
                  msg: 'Hable con el administrador'
            })
      }

}

const actualizarEvento = async(req, res = response) => {

      // id que viene desde la url
      const eventoId = req.params.id
      const uid = req.uid;

      // interaccion con la db - hay que veriifcar que el id exista
      try {
            const evento = await Evento.findById(eventoId);
            if (!evento) {
                  return res.status(404).json({
                        ok: false,
                        msg: 'No existe id en la base de datos'
                  })
            }

            // verificar si la persona que creo el evento es la misma que la quiere borrar
            if (evento.user.toString() !== uid) {
                  return res.status(401).json({
                        ok: false,
                        msg: 'No tiene privilegio de editar este evento'
                  })
            }

            const nuevoEvento = {
                  ...req.body,
                  user: uid
            }

            const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

            return res.json({
                  ok: true,
                  evento: eventoActualizado
            })


      } catch (error) {
            console.log(error);
            return res.status(500).json({
                  ok: true,
                  msg: 'Hable con el administrador'
            })
            // falta comprobar si se trata de un id de mongo
      }
}

const eliminarEvento = async(req, res = response) => {

      const eventoId = req.params.id
      const uid = req.uid;

      // interaccion con la db - hay que veriifcar que el id exista
      try {
            const evento = await Evento.findById(eventoId);
            if (!evento) {
                  return res.status(404).json({
                        ok: false,
                        msg: 'No existe id en la base de datos'
                  })
            }

            // verificar si la persona que creo el evento es la misma que la quiere borrar
            if (evento.user.toString() !== uid) {
                  return res.status(401).json({
                        ok: false,
                        msg: 'No tiene privilegio de eliminar este evento'
                  })
            }

            await Evento.findByIdAndDelete(eventoId,)

            return res.json({
                  ok: true,
            })

      } catch (error) {
            console.log(error);
            return res.status(500).json({
                  ok: true,
                  msg: 'Hable con el administrador'
            })
            // falta comprobar si se trata de un id de mongo
      }

}

module.exports = {
      getEventos,
      crearEvento,
      actualizarEvento,
      eliminarEvento,
}