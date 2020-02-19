const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


// Conexion a postgres
const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: 'proyecto_redsocial',
    user: 'postgres',
    password: 'admin123'
})

// Funcion de registro de usuario - sin validar
async function register(req, res) {
    const { usuario_nombres, usuario_apellidos, usuario_email, usuario_password, usuario_fechanac, usuario_sexo } = req.body;
    let usuario_path_face = `faces/${req.file.originalname}`;
    let usuario_acc_verify, usuario_activo, usuario_conectado;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(usuario_password, salt);
    usuario_acc_verify = false;
    usuario_activo = true;
    usuario_conectado = true;


    try {
        let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });

        query = `INSERT INTO usuario
                    (usuario_nombres, usuario_apellidos, usuario_email, usuario_password, usuario_fechanac, usuario_sexo,
                        usuario_acc_verify, usuario_path_face, usuario_activo, usuario_conectado) 
                    VALUES ('${usuario_nombres}','${usuario_apellidos}','${usuario_email}','${hash}','${usuario_fechanac}','${usuario_sexo}',
                    '${usuario_acc_verify}', '${usuario_path_face}', '${usuario_activo}', '${usuario_conectado}')`;
        result = await pool.query(query);
        const token = jwt.sign({ _id: usuario_email }, 'secretkey');

        res.json({ token })
    } catch (error) {
        return res.json({ message: "Error al registrar usuario" })
    }
}

// funcion de login - validado
async function login(req, res) {
    const { usuario_email, usuario_password } = req.body;
    let query = `SELECT * FROM usuario where usuario_email = '${usuario_email}'`;
    const user = await pool.query(query);
    if (user.rows == 0) return res.json({ message: "Usuario no registrado" });
    let pass_correct = await bcrypt.compareSync(usuario_password, user.rows[0].usuario_password);
    if (!pass_correct) return res.json({ message: "Contraseña errónea" })

    const token = jwt.sign({ _id: usuario_email }, 'secretkey');

    res.json({ token })
}

async function getUsuario(req, res) {
    let query = `SELECT * FROM usuario`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay usuarios registrados", result: [] });
    result.rows.forEach(usuario => {
        var base64str = base64_encode(usuario.usuario_path_face);
        usuario.base64str = base64str;
        usuario.image_name = path.basename(usuario.usuario_path_face);
    });
    res.json(result.rows);
}

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}

async function recFacialLogin(req, res) {
    const { id } = req.body;
    let query = `SELECT * FROM usuario where usuario_id = '${id}'`;
    const result = await pool.query(query);
    if (result.rows[0]) {
        const token = jwt.sign({ _id: result.rows[0].usuario_email }, 'secretkey');
        return res.json({ token, user: result.rows[0] })
    }
}

module.exports = {
    login,
    register,
    getUsuario,
    recFacialLogin
};