// src/db.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

// Configurar variables de entorno
dotenv.config();

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir del proceso en caso de error
  }
  console.log('Conectado a la base de datos');
});

module.exports = db;
