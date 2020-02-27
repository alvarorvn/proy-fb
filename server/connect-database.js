const { Pool } = require('pg');

// Conexion a postgres
const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: 'proyecto_redsocial',
    user: 'postgres',
    password: 'root'
})


module.exports = {
    pool
}