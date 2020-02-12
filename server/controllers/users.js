const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = {};

// Conexion a postgres
const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: 'proyecto_redsocial',
    user: 'postgres',
    password: 'admin123'
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

    try {
        let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo" });

        query = `INSERT INTO usuario
                    (usuario_nombres, usuario_apellidos, usuario_email, usuario_password, usuario_fechanac, usuario_sexo,
                        usuario_acc_verify, usuario_path_face, usuario_activo, usuario_conectado) 
                    VALUES ('${usuario_nombres}','${usuario_apellidos}','${usuario_email}','${hash}','${usuario_fechanac}','${usuario_sexo}
                    ', '${usuario_acc_verify}', '${usuario_path_face}', '${usuario_activo}', '${usuario_conectado}')`;
        result = await pool.query(query);
        const token = jwt.sign({ _id: usuario_email }, 'secretkey');

        res.json({ token })
    } catch (error) {
        return res.json({message:"Error al registrar usuario"})
    }
}

// funcion de login - validado
users.login = async (req, res) => {
    const { usuario_email, usuario_password } = req.body;
    let query = `SELECT * FROM usuario where usuario_email = '${usuario_email}'`;
    const user = await pool.query(query);
    if (user.rows == 0) return res.json({ message: "Usuario no registrado" });
    let pass_correct = await bcrypt.compareSync(usuario_password, user.rows[0].usuario_password);
    if (!pass_correct) return res.json({ message: "Contraseña errónea" })

    const token = jwt.sign({ _id: usuario_email }, 'secretkey');

    res.json({ token })
}

module.exports = users;