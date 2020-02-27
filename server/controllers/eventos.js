const fs = require('fs');
const path = require('path');
const validar = require('../src/validaciones');
const pool = require('../database/conexion');

// Funcion de registro de eventos 
async function addEvento(req, res) {
    
    const { evento_tipo, evento_fecha_hora, evento_lugar, evento_nombre } = req.body;
    let evento_logo = `faces/${req.files[0].originalname}`;
    let evento_portada = `faces/${req.files[1].originalname}`;

    try {
        query = `INSERT INTO eventos
                    ( evento_logo, evento_portada, evento_tipo, evento_fecha_hora, evento_lugar, evento_nombre) 
                    VALUES ('${evento_logo}','${evento_portada}','${evento_tipo}','${evento_fecha_hora}','${evento_lugar}','${evento_nombre}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Evento registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar evento" });
    }
    
    console.log(req.files);
    console.log(req.body);
}

// Funcion de obtener de eventos 
async function obtEventos(req, res) {
    let query = `SELECT * FROM eventos`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay eventos registrados", result: [] });
    result.rows.forEach(eventos => {
        if (eventos.evento_logo != "") {
            var base64str = base64_encode(eventos.evento_logo);
            eventos.image_logo = base64str;
            eventos.image_logo = path.basename(eventos.evento_logo);
        }
    });
    res.json(result.rows);
}


module.exports = {
    addEvento, obtEventos
};