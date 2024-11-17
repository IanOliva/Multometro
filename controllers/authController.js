const db = require("../src/db"); // Importa la lógica de conexión a la base de datos
const crypto = require("crypto"); //  encripta las contraseñas
const jwt = require("jsonwebtoken"); // Genera un token de autenticación

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Por favor, ingrese usuario y contraseña" });
    }

    // Consultar usuario en la base de datos
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const user = rows[0];
    const passwordMatch = await verifyPassword(user.password, password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Generar el JWT y guardarlo en una cookie segura
    const token = generateJWT(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    // Redirigir al usuario a /dashboard
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};



// Función para verificar la contraseña usando pbkdf2
function verifyPassword(storedHash, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, "salt", 1000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(storedHash === derivedKey.toString("hex")); // Compara el hash almacenado con el generado
    });
  });
}

// Función para generar el JWT
function generateJWT(user) {
  return jwt.sign(
    { id: user.id, username: user.username }, // Payload (lo que incluirá el token)
    process.env.JWT_SECRET, // Clave secreta (debe ser única y segura)
    { expiresIn: "1h" } // El tiempo que durará el token
  );
}
