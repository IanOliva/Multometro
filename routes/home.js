const express = require('express');
const router = express.Router();

// ruta principal
router.get('/', (req, res) => {
    res.render('home', { title: 'Multometro' });
});



// router.post('/login', (req, res) =>{});

module.exports = router;