/*
                REST API

    API que se conecta con PostgreSQL

Creado por:

Juan Fernando De Leon Quezada           Carne 17822
Diego Estrada                           Carne 18XXX
Andree Toledo                           Carne 18XXX

*/


//API de Postgres

const express = require('express');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

app.listen(4000);
console.log('Server on port', 4000);