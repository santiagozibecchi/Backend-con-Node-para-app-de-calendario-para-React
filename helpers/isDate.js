const moment = require('moment');

const isDate = ( value ) => {

      // Si regresa falso el campo es incorrecto, por lo tanto la validacion va a fallar
      if (!value) {
            return false;
      }

      const fecha = moment(value);
      if (fecha.isValid()) {
            return true;
      } else {
            return false;
      }

}

module.exports = {
      isDate
}