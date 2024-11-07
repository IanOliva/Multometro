// src/index.js

// Importar dependencias
const express = require('express');
const dotenv = require('dotenv');
const db = require('./db'); // Importar la conexión a la base de datos
const path = require('path');


// Configurar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Configurar puerto
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar la carpeta public para archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// parse URL-encoded bodies para poder usar la data enviada de cualquier form
app.use(express.urlencoded({ extended: false }));

// parse json bodies para que la data enviada sea en formato json
app.use(express.json());

// Rutas home
app.use('/', require('../routes/home'));

// Rutas auth
app.use('/auth', require('../routes/auth'));


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
