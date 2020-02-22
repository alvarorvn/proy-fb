const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const pool = require('../connect-database');


// Funcion de registro de publicacion
async function register(req, res) {
    const { pub_texto, pub_pathMult, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id, grupo_id, pagina_id, evento_id} = req.body;
    
    try {

        query = `INSERT INTO publicaciones
                    (pub_texto, pub_pathMult, pub_fechahora, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id, grupo_id, pagina_id, evento_id) 
                    VALUES ('${pub_texto}','${pub_pathMult}', now(), '${pub_tipo}','${pub_duracion}','${pub_estado}',
                    '${usuario_id}', '${perfilusu_id}', '${grupo_id}', '${pagina_id}', '${evento_id}')`;
        result = await pool.query(query);

        res.json({
            "pub_texto": pub_texto
        });
        
    } catch (error) {
        return res.json({ message: "Error al registrar publicacion" })
    }
}

// funcion de login - validado
async function login(req, res) {
    const { usuario_email, usuario_password } = req.body;
    let query = `SELECT * FROM usuario where usuario_email = '${usuario_email}'`;
    const user = await pool.query(query);
    if (user.rows == 0) return res.json({ message: "Usuario no registrado", tipo: "error" });
    let pass_correct = await bcrypt.compareSync(usuario_password, user.rows[0].usuario_password);
    if (!pass_correct) return res.json({ message: "Contraseña errónea", tipo: "error" })

    const token = jwt.sign({ _id: usuario_email }, 'secretkey');

    res.json({ token, user: user.rows[0] })
}

async function getUsuarios(req, res) {
    let query = `SELECT * FROM usuario`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay usuarios registrados", result: [] });
    result.rows.forEach(usuario => {
        if (usuario.usuario_path_face != "") {
            var base64str = base64_encode(usuario.usuario_path_face);
            usuario.image_rec_facial = base64str;
            usuario.image_rec_facial_name = path.basename(usuario.usuario_path_face);
        }
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

async function getUsuario(req, res) {
    const { usuario_id } = req.body;
    let query = `SELECT * FROM usuario as usu, perfil_usuario as perfil 
                    WHERE usu.usuario_id=${usuario_id} AND usu.usuario_id = perfil.usuario_id`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay usuarios registrados", tipo: 'error', result: [] });
    result.rows.forEach(usuario => {
        if (usuario.usuario_path_face != "") {
            var base64str = base64_encode(usuario.usuario_path_face);
            usuario.image_rec_facial = base64str;
            usuario.image_rec_facial_name = path.basename(usuario.usuario_path_face);
        }
        if (usuario.perfil_path_foto != "") {
            var base64str = base64_encode(usuario.perfil_path_foto);
            usuario.image_perfil = base64str;
            usuario.image_perfil_name = path.basename(usuario.perfil_path_foto);
        }
        if (usuario.perfil_path_portada != "") {
            var base64str = base64_encode(usuario.perfil_path_portada);
            usuario.image_portada = base64str;
            usuario.image_portada_name = path.basename(usuario.perfil_path_portada);
        }
    });
    res.json(result.rows[0]);
}

module.exports = {
    login,
    register,
    getUsuarios, getUsuario,
    recFacialLogin
};