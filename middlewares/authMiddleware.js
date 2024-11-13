//middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de las cookies

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado: no se proporcionó un token" });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar la información decodificada al objeto req
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    console.error("Token inválido:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};


