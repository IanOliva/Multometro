
const express = require('express');
const router = express.Router();

const jurisdiccionController = require('../controllers/jurisdiccionController');


router.get('/jurisdicciones', jurisdiccionController.getJurisdicciones);

router.post('/jurisdicciones', jurisdiccionController.createJurisdiccion);

router.get('/jurisdicciones/delete/:id', jurisdiccionController.deleteJurisdiccion);

module.exports = router;