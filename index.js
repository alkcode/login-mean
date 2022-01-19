const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// console.log(process.env)

//Crear servidor/aplicacion express
const app = express();

//Conexion DB

dbConnection();

//Directorio publico
app.use(express.static('public'))

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());



//GET
app.use('/api/auth', require('./routes/auth'));

// manejar posibles rutas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});