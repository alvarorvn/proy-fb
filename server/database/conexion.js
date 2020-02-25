const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "proyecto_redsocial",
  password: "admin123",
  port: 5432,
});

module.exports = pool;