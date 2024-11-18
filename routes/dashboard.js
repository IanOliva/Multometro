
const express = require('express');
const router = express.Router();

const jurisdiccionController = require('../controllers/jurisdiccionController');
const dashboardController = require('../controllers/dashboardController');
const middleware = require('../middlewares/authMiddleware');


router.get('/', middleware.verifyToken, dashboardController.getDashboard);

router.get('/jurisdicciones',middleware.verifyToken, jurisdiccionController.getJurisdicciones);

router.post('/jurisdicciones', jurisdiccionController.createJurisdiccion);

router.get('/jurisdicciones/delete/:id', jurisdiccionController.deleteJurisdiccion);

router.post('/multas/create',middleware.verifyToken, dashboardController.createMulta);

router.post('/multas/delete/:id',middleware.verifyToken, dashboardController.deleteMulta);

module.exports = router;