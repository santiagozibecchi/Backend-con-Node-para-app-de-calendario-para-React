const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

      // x-token HEADER
      const token = req.header('x-token');

      // si no viene el token
      if (!token) {
            // lo sacamos al usuario
            return res.status(401).json({
                  ok: false,
                  msg: 'No hay token en la peticion'
            })
      }

      try {
            // esto viene del payload del token
            const { uid, name } = jwt.verify(
                  token,
                  process.env.SECRET_JWT_SEED
            )

            req.uid = uid;
            req.name = name;

      } catch (error) {
            // console.log(error);
            return res.status(401).json({
                  ok: false,
                  msg: 'Token no valido'
            })
      }

      next();
}

module.exports = {
      validarJWT
}