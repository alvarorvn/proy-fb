const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = {};

// Conexion a postgres
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'proyecto_redsocial',
    port: '5432'
})

// Funcion de registro de usuario - sin validar
users.register = async (req, res) => {
    const { usuario_nombres, usuario_apellidos, usuario_email, usuario_password, usuario_fechanac, usuario_sexo, usuario_path_face } = req.body;
    let usuario_acc_verify, usuario_activo, usuario_conectado;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(usuario_password, salt);
    usuario_acc_verify = false;
    usuario_activo = true;
    usuario_conectado = true;
    let query = `INSERT INTO usuario 
                    (usuario_nombres, usuario_apellidos, usuario_email, usuario_password, usuario_fechanac, usuario_sexo,
                        usuario_acc_verify, usuario_path_face, usuario_activo, usuario_conectado) 
                    VALUES ('${usuario_nombres}','${usuario_apellidos}','${usuario_email}','${hash}','${usuario_fechanac}','${usuario_sexo}
                    ', '${usuario_acc_verify}', '${usuario_path_face}', '${usuario_activo}', '${usuario_conectado}')`;
    console.log(query);
    /*await pool.query(query);

    const token = jwt.sign({ _id: email }, 'secretKey')

    res.status(200).json({ token })*/
}

// funcion de login - validado
users.login = async (req, res) => {
    const { user_email, user_password } = req.body;
    let query = `SELECT * FROM usuarios where user_email = '${user_email}'`;
    const user = await pool.query(query);
    if (user.rows == 0) return res.status(401).json({ message: "Usuario no registrado" });
    if (user.rows[0].user_password != user_password) return res.status(401).json({ message: "Password erroneo" })

    const token = jwt.sign({ _id: user_email }, 'secretKey');

    res.status(200).json({ token })
}

// Funcion de pagina principal
users.index = (req, res) => {
    res.json({ message: "Login" })
}

module.exports = users;