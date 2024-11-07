const mysql = require('mysql2/promise'); // Importar el módulo con soporte de promesas
const dotenv = require('dotenv');

// Configurar variables de entorno
dotenv.config();

// Crear la conexión a la base de datos
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar la conexión
module.exports = db;

