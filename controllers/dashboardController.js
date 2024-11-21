const db = require("../src/db");

exports.getDashboard = async (req, res) => {
    const user = req.user; //obtengo el user desde el middleware del token

    const [totalMultas] = await db.execute(
        "SELECT COUNT(*) AS total FROM multas"
    );
    const [jurisdicciones] = await db.execute("SELECT * FROM jurisdicciones");

    const [multas] = await db.execute("SELECT * FROM multas");

    res.render("dashboard", {
        title: "Multometro",
        user: user,
        jurisdicciones: jurisdicciones,
        totalMultas: totalMultas[0].total,
        multas: multas,
    });
};

exports.createMulta = async (req, res) => {
    const { nombre, apellido, patente, dni, multa, jurisdiccion, total } =
        req.body;

    if (
        !nombre ||
        !apellido ||
        !patente ||
        !dni ||
        !multa ||
        !jurisdiccion ||
        !total
    ) {
        return res
            .status(400)
            .json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        // Inserta los valores necesarios, dejando que MySQL maneje id y fecha automáticamente
        await db.execute(
            "INSERT INTO multas (nombre, apellido, dni, patente, monto, descuento) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, dni, patente, multa, jurisdiccion]
        );

        return res
            .status(200)
            .json({ success: true, message: "Registro guardado exitosamente" });
    } catch (error) {
        console.error("Error al guardar el registro:", error);
        return res
            .status(500)
            .json({ success: false, message: "Error al guardar el registro" });
    }
};

exports.updateMulta = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, patente, multa, jurisdiccion } = req.body;
    try {
        await db.execute(
            "UPDATE multas SET nombre = ?, apellido = ?, dni = ?, patente = ?, monto = ?, descuento = ? WHERE id = ?",
            [nombre, apellido, dni, patente, multa, jurisdiccion, id]
        );
        return res
            .status(200)
            .json({ success: true, message: "Multa actualizada" });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Error al actualizar la multa" });
    }
};

exports.deleteMulta = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM multas WHERE id = ?", [id]);
        return res.status(200).send("Multa eliminado exitosamente");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al eliminar la multa");
    }
};
