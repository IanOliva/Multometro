const db = require('../src/db');


exports.getDashboard = async (req, res) => {

    const user = req.user; //obtengo el user desde el middleware del token

    const [totalMultas] = await db.execute('SELECT COUNT(*) AS total FROM multas');
    const [jurisdicciones] = await db.execute('SELECT * FROM jurisdicciones');

    const [multas] = await db.execute('SELECT * FROM multas');


    res.render('dashboard', { 
        title: 'Multometro',
        user: user,
        jurisdicciones: jurisdicciones,
        totalMultas: totalMultas[0].total,
        multas: multas,

     });
};

exports.createMulta = async (req, res) => {
    const { nombre, apellido, patente, dni, multa, jurisdiccion, total } = req.body;

    if (!nombre || !apellido || !patente || !dni || !multa || !jurisdiccion || !total) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        // Inserta los valores necesarios, dejando que MySQL maneje id y fecha automáticamente
        await db.execute(
            'INSERT INTO multas (nombre, apellido, dni, patente, monto, descuento) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, dni, patente, multa, jurisdiccion]
        );
        res.send('Registro guardado exitosamente');
    } catch (error) {
        console.error('Error al guardar el registro:', error);
        res.status(500).send('Error al guardar el registro');
    }
};



