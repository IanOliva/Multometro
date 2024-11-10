const db = require('../src/db');

exports.getDashboard = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.render('dashboard', { users: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
};