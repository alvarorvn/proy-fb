const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Conexion a postgres
const {pool} = require('./../connect-database');
let auth = ( req, res, next) => {

    // validar si viene el token
    let token = req.get('Authorization');
    if(token)
        token = token.replace('Bearer ', '');

    jwt.verify(token, 'secretkey', async(err, decoded) => {
        if(err) return res.status(401).send({ message: "No autorizado", ok: false });
        
        let query = `SELECT * FROM usuario WHERE usuario_email = '${decoded._id}'`;
        let result = await pool.query(query);
        
        if (result.rowCount <= 0) return res.status(401).send({ message: "No autorizado", ok: false });
        
        req.user = {id: result.rows[0].usuario_id};

        next();
    })

    //next();
} 

module.exports = auth;