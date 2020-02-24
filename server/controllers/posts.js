const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { pool } = require("../connect-database");

// Registro de publicacion
async function savepost(req, res) {
  const { pub_texto, usuario_id } = req.body;
  console.log(pub_texto, usuario_id);

  /**
   * pub_pathMult,
    pub_tipo,
    pub_duracion,
    pub_estado,
    usuario_id,
    perfilusu_id
   */
  try {
    /*query = `INSERT INTO publicacion
                    (pub_texto, "pub_pathMult", pub_fechahora, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id) 
                    VALUES ('${pub_texto}','${pub_pathMult}', now(), '${pub_tipo}','${pub_duracion}','${pub_estado}',
                    '${usuario_id}', '${perfilusu_id}')`;*/

    query = `INSERT INTO publicacion
                    (pub_texto, usuario_id) 
                    VALUES ('${pub_texto}', ${usuario_id})`;

    result = await pool.query(query);

    res.json({
      pub_texto: pub_texto
    });
  } catch (error) {
    return res.json({
      message: "Error al registrar publicacion",
      error: error
    });
  }
}

// Obtiene todas las publicaciones del usuario especificado determinado por su ID
async function getPostsUser(req, res) {
  const { usuario_id } = req.params;
  console.log("ID recibido: " + usuario_id);
  let query = `SELECT pub_id, pub_texto, usuario_id  FROM publicacion WHERE usuario_id=${usuario_id}`;
  let result = await pool.query(query);
  if (result.rows == 0)
    return res.json({ message: "No hay publicaciones", result: [] });
  res.json(result.rows);
}

// Elimina una publicacion a partir de su ID
async function deletePost(req, res) {
  const { pub_id } = req.params;
  let query = `DELETE FROM publicacion WHERE pub_id = ${pub_id}`;
  let result = await pool.query(query);
  
  res.json({n:result.rowCount});
}

module.exports = {
  savepost,
  getPostsUser,
  deletePost
};
