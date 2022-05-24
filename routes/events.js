/*
      Rutas de Eventos / events
      host + /api/events
*/

// CRUD
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')

const {
      getEventos,
      crearEvento,
      actualizarEvento,
      eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = Router();

// Todas tienen que ser validadas por JWT
// Cualquier peticion que se encuentre justo por abajo pasaran por el router.use() 
router.use(validarJWT);


// Obtener eventos
router.get('/', getEventos);

// creat un nuevo evento
router.post('/',
      [
            check('title', 'El titulo es obligatrio').not().isEmpty(),
            // Check personalizado:
            check('start', 'La fecha de inicio es obligatoria').custom(isDate),
            check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
            validarCampos
      ], crearEvento
);

// Actualizar evento
router.put('/:id',
      [
            check('title', 'El titulo es obligatrio').not().isEmpty(),
            // Check personalizado:
            check('start', 'La fecha de inicio es obligatoria').custom(isDate),
            check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
            validarCampos
      ], actualizarEvento
);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;


