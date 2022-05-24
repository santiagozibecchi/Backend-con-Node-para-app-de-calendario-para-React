const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Crear  el servidor de express
const app = express();

//Coneccion a DB
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body -> las peticiones que vengan en formato json son procesadas en este punto y extraigo su contenido
app.use(express.json());



// RUTAS
// todo lo que se encuentra en require, llevalo a la ruta 'api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO auth // cerrar // login // renew

// TODO CRUD: events




// Escuchar peticiones
app.listen(process.env.PORT, () => {
      console.log('Servidor corriendo en puerto', process.env.PORT);
});