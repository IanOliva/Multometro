const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const authController = require('../controllers/authController');
// ruta login
router.get('/login', (req, res) => {
    res.render('login', { title: 'Multometro' });
});

router.post('/login', authController.login);

// router.get('/hash', async(req, res) => {
//     const password = 'admin.123'; 
//     const hashedPassword = await hashPassword(password);
//     console.log('Hashed Password:', hashedPassword);
// });

// function hashPassword(password) {
//     return new Promise((resolve, reject) => {
//       crypto.pbkdf2(password, 'salt', 1000, 64, 'sha512', (err, derivedKey) => {
//         if (err) reject(err);
//         resolve(derivedKey.toString('hex')); // El hash generado se convierte a hexadecimal
//       });
//     });
//   }
module.exports = router;

