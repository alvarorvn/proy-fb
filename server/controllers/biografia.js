const fs = require('fs');
const path = require('path');
const validar = require('../src/validaciones');
const pool = require('../database/conexion');

// Funcion de registro de usuario - sin validar
async function addEmpleo(req, res) {
    const { empleo_empresa, empleo_puesto, empleo_detalle, empleo_fechainicio, empleo_fechafin, perfilusu_id } = req.body;
    if (validar.campoVacio(empleo_empresa) || validar.campoVacio(empleo_puesto) || validar.campoVacio(empleo_detalle) ||
        validar.campoVacio(empleo_fechainicio) || validar.campoVacio(empleo_fechafin) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO empleo
                    (empleo_empresa, empleo_puesto, empleo_detalle, empleo_fechainicio, empleo_fechafin, perfilusu_id) 
                    VALUES ('${empleo_empresa}','${empleo_puesto}','${empleo_detalle}','${empleo_fechainicio}','${empleo_fechafin}','${perfilusu_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Empleo registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar empleo" });
    }
}

// Obtener todos los usuarios
async function getEmpleos(req, res) {
    let query = `SELECT * FROM empleo WHERE perfilusu_id = ${req.params.perfilID}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay empleos registrados", result: [] });
    result.rows.forEach(item => {
        item.empleo_fechainicio = validar.changeFormatDate(item.empleo_fechainicio, 'DD [de] MMMM [de] YYYY');
        item.empleo_fechafin = validar.changeFormatDate(item.empleo_fechafin, 'DD [de] MMMM [de] YYYY');
    });
    res.json(result.rows);
}

// codifica imagen
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}

async function deteleEmpleo(req, res) {
    try {
        let sql = `DELETE FROM empleo where empleo_id = '${req.params.empleo_id}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe empleo a eliminar", tipo: "error" });
        return res.json({ message: "Empleo eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar empleo", tipo: "error" });
    }
}

module.exports = {
    addEmpleo, getEmpleos
};