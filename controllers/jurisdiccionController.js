const db = require('../src/db');
const jwt = require('jsonwebtoken');


exports.getJurisdicciones = async (req, res) => {
    try {
        const user = req.user;
        
        const [rows] = await db.execute('SELECT * FROM jurisdicciones');
        res.render('jurisdiciones', { 
            title: 'Multometro',
            user: user,
            jurisdicciones: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las jurisdiciones');
    }
};

exports.createJurisdiccion = async (req, res) => {
    const { jurisdiccion, porcentaje } = req.body;
    try {
        await db.execute('INSERT INTO jurisdicciones (nombre, porcentaje) VALUES (?, ?)', [jurisdiccion, porcentaje]);
        res.send('Registro guardado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el registro');
    }
};

exports.deleteJurisdiccion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM jurisdicciones WHERE id = ?', [id]);
        res.send('Registro eliminado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el registro');
    }
}