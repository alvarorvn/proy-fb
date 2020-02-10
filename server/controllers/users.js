const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = {};

// Conexion a postgres
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    database: 'proy-fb',
    port: '5432'
})

// Funcion de registro de usuario - sin validar
users.register = async (req, res) => {
    const { nombres, apellidos, email, password, fecha_nac, sexo } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let query = `INSERT INTO usuarios 
                    (user_nombres, user_apellidos, user_email, user_password, user_fecha_nac, user_sexo, user_acc_verify) 
                    VALUES ('${nombres}','${apellidos}','${email}','${hash}','${fecha_nac}','${sexo}','false')`;
    await pool.query(query);

    const token = jwt.sign({ _id: email }, 'secretKey')

    res.status(200).json({ token })
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

users.buscaruser = async (req, res) => {
    const { user } = req.body;
    let query = `SELECT * FROM usuarios where user = '${user}'`;
    const users = await pool.query(query);
    if (users.rows == 0) return res.status(401).json({ message: "No hay resultado" });
    res.status(200).json({users})
}
// Funcion de pagina principal
users.index = (req, res) => {
    res.json({message: "Login"})
}

module.exports = users;