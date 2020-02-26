const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const pool = require('../database/conexion');
const validar = require('../src/validaciones');

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
        query = `SELECT * FROM usuario where usuario_email = '${usuario_email}'`;
        result = await pool.query(query);
        query = `INSERT INTO perfil_usuario
                    (perfil_path_foto, perfil_path_portada, perfil_interes, perfil_religion, perfil_informacion,
                        usuario_id)
                    VALUES ('','','','','','${result.rows[0].usuario_id}')`;
        await pool.query(query);

        const token = jwt.sign({ _id: usuario_email }, 'secretkey');

        res.json({ token })
    } catch (error) {
        return res.json({ message: "Error al registrar usuario" });
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

// Obtener todos los usuarios
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

// codifica imagen
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}

// inicio de sesion con reconocimiento facial
async function recFacialLogin(req, res) {
    const { id } = req.body;
    let query = `SELECT * FROM usuario where usuario_id = '${id}'`;
    const result = await pool.query(query);
    if (result.rows[0]) {
        const token = jwt.sign({ _id: result.rows[0].usuario_email }, 'secretkey');
        return res.json({ token, user: result.rows[0] })
    }
}
async function getPersonas(req, res) {

    let query = `SELECT usuario.usuario_id, 
                usuario.usuario_nombres, 
                usuario.usuario_apellidos, 
                perfil_usuario.perfil_path_foto, 
                usuario.usuario_sexo
                FROM usuario, perfil_usuario
                WHERE usuario.usuario_id = perfil_usuario.usuario_id AND
                (usuario.usuario_nombres ILIKE '%${req.params.usr_busq}%' 
                OR usuario.usuario_apellidos 
                ILIKE '%${req.params.usr_busq}%')`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({
        message: "No se registraron coincidencias",
        tipo: 'error', result: []
    });
    result.rows.forEach(persona => {
        if (persona.perfil_path_foto != "") {
            var base64str = base64_encode(persona.perfil_path_foto);
            persona.image_perfil = base64str;
            persona.image_perfil_name = path.basename(persona.perfil_path_foto);
        }
    });
    res.json(result.rows);

}
//obtiene datos de usuario (perfil)
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
        usuario.usuario_fechanac = validar.changeFormatDate(usuario.usuario_fechanac, 'YYYY-MM-DD');
        usuario.usuario_fechanacM = validar.changeFormatDate(usuario.usuario_fechanac, 'DD [de] MMMM [de] YYYY');
    });
    res.json(result.rows[0]);
}

// obtiene los seguidores de un usuario
async function getSeguidores(req, res) {
    const { id } = req.params;
    let query = `SELECT seg.*, usu.usuario_nombres, usu.usuario_apellidos, usu.usuario_sexo, per.perfil_path_foto
                    FROM seguidos as seg, usuario as usu, perfil_usuario as per
                    WHERE seg.usuario_id_sigue=${id} AND seg.usuario_id = usu.usuario_id AND per.usuario_id = seg.usuario_id`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay usuarios registrados", tipo: 'error', result: [] });
    result.rows.forEach(seguidor => {
        if (seguidor.perfil_path_foto != "") {
            var base64str = base64_encode(seguidor.perfil_path_foto);
            seguidor.image_perfil = base64str;
            seguidor.image_perfil_name = path.basename(seguidor.perfil_path_foto);
        }
    });
    res.json(result.rows);
}

// obtiene los usuarios que sigue
async function getSeguidos(req, res) {
    const { id } = req.params;
    let query = `SELECT seg.*, usu.usuario_nombres, usu.usuario_apellidos, usu.usuario_sexo, per.perfil_path_foto
                    FROM seguidos as seg, usuario as usu, perfil_usuario as per
                    WHERE seg.usuario_id=${id} AND seg.usuario_id_sigue = usu.usuario_id AND per.usuario_id = seg.usuario_id_sigue`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No sigues a otros usuarios", tipo: 'error', result: [] });
    result.rows.forEach(seguido => {
        if (seguido.perfil_path_foto != "") {
            var base64str = base64_encode(seguido.perfil_path_foto);
            seguido.image_perfil = base64str;
            seguido.image_perfil_name = path.basename(seguido.perfil_path_foto);
        }
    });
    res.json(result.rows);
}

// obtiene los amigos de un usuario
async function getAmigos(req, res) {
    const { id } = req.params;
    let query = `SELECT am.*, usu.usuario_nombres, usu.usuario_apellidos, usu.usuario_sexo, usu.usuario_conectado, per.perfil_path_foto
                    FROM amigos as am, usuario as usu, perfil_usuario as per
                    WHERE am.usuario_id=${id} AND am.usuario_id_amigo = usu.usuario_id AND per.usuario_id = am.usuario_id_amigo`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay amigos", tipo: 'error', result: [] });
    result.rows.forEach(amigo => {
        if (amigo.perfil_path_foto != "") {
            var base64str = base64_encode(amigo.perfil_path_foto);
            amigo.image_perfil = base64str;
            amigo.image_perfil_name = path.basename(amigo.perfil_path_foto);
        }
    });
    res.json(result.rows);
}

// actualiza foto de perfil
async function updatePerfilPhoto(req, res) {
    const { id } = req.params;
    let perfil_path_foto = `faces/${req.files[0].originalname}`

    try {
        let query = `SELECT * FROM usuario WHERE usuario_id = ${id}`;
        let result = await pool.query(query);
        if (result.rowCount == 0) return res.json({ message: "No existe el usuario a actualizar", tipo: 'error' });
        query = `UPDATE perfil_usuario set perfil_path_foto = '${perfil_path_foto}'
                    WHERE usuario_id = ${id}`;
        await pool.query(query);
        return res.json({ message: "Foto de perfil actualizada" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar foto de perfil" });
    }
}

// actualiza portada
async function updatePortadaPhoto(req, res) {
    const { id } = req.params;
    let perfil_path_portada = `faces/${req.files[0].originalname}`

    try {
        let query = `SELECT * FROM usuario WHERE usuario_id = ${id}`;
        let result = await pool.query(query);
        if (result.rowCount == 0) return res.json({ message: "No existe el usuario a actualizar", tipo: 'error' });
        query = `UPDATE perfil_usuario set perfil_path_portada = '${perfil_path_portada}'
                    WHERE usuario_id = ${id}`;
        await pool.query(query);
        return res.json({ message: "Portada actualizada" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar portada" });
    }
}

// Actualiza userLogin
async function updateUserLogin(req, res) {
    const { usuario_fechanac, usuario_sexo } = req.body;
    if (validar.campoVacio(usuario_fechanac) || validar.campoVacio(usuario_sexo))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM usuario where usuario_id = '${req.params.iduser}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe usuario registrado a editar", tipo: "error" });
        sql = `UPDATE usuario SET
            usuario_fechanac = '${usuario_fechanac}', usuario_sexo= '${usuario_sexo}'
            WHERE usuario_id = '${req.params.iduser}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Datos actualizados con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar datos", tipo: "error" });
    }
}

// Actualiza estado de conexion
async function updateConectado(req, res) {
    const { usuario_conectado } = req.body;
    /*if (validar.campoVacio(usuario_fechanac) || validar.campoVacio(usuario_sexo))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });*/

    try {
        let sql = `SELECT * FROM usuario where usuario_id = '${req.params.iduser}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe usuario registrado a editar", tipo: "error" });
        sql = `UPDATE usuario SET
            usuario_conectado = '${usuario_conectado}' WHERE usuario_id = '${req.params.iduser}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Estado actualizado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar estado", tipo: "error" });
    }
}

// Obtener ciudades
async function getCiudades(req, res) {
    let query = `SELECT * FROM ciudad`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay ciudades registrados", result: [] });
    res.json(result.rows);
}

module.exports = {
    login,
    register,
    getPersonas, getUsuarios, getUsuario, getSeguidores, getAmigos, getSeguidos,
    recFacialLogin, getCiudades,
    updatePerfilPhoto, updatePortadaPhoto, updateUserLogin, updateConectado

};