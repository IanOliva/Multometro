const db = require('../src/db');
const jwt = require('jsonwebtoken');

exports.getDashboard = async (req, res) => {

    const user = req.user;
    const [jurisdicciones] = await db.execute('SELECT * FROM jurisdicciones');


    res.render('dashboard', { 
        title: 'Multometro',
        user: user,
        jurisdicciones: jurisdicciones,

     });
};