const { Pool } = require('pg');
const users = {};
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    database: 'proy-fb',
    port: '5432'
})

users.register = async (req, res) => {
    const { nombres, apellidos, email, password, fecha_nac, sexo } = req.body;
    let query = `INSERT INTO usuarios 
                    (user_nombres, user_apellidos, user_email, user_password, user_fecha_nac, user_sexo, user_acc_verify) 
                    VALUES ('${nombres}','${apellidos}','${email}','${password}','${fecha_nac}','${sexo}','false')`;
    const resp = await pool.query(query);
    res.json({ message: 'Usuario registrado, revise su cuenta de correo' })
}

module.exports = users;