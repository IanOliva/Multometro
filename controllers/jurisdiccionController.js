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
        return res.status(200).json({ success: true, message: 'Jurisdiccion creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al crear la jurisdiccion' });
    }
};

exports.updateJurisdiccion = async (req, res) => {
    const { id } = req.params;
    const { nombre, porcentaje } = req.body;
    try {
        await db.execute(
            "UPDATE jurisdicciones SET nombre = ?, porcentaje = ? WHERE id = ?",
            [nombre, porcentaje, id]
        );
        return res
            .status(200)
            .json({ success: true, message: "Jurisdiccion actualizada" });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Error al actualizar la jurisdiccion" });
    }
};

exports.deleteJurisdiccion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM jurisdicciones WHERE id = ?', [id]);
        return res.status(200).json({ success: true, message: 'Jurisdiccion eliminada exitosamente' });
    } catch (error) {
        console.error(error);
      return res.status(500).json({ success: false, message: 'Error al eliminar la jurisdiccion' });
    }
}