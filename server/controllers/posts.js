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
   * pub_pathMult, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id
   */
  try {
    /*query = `INSERT INTO publicacion
                    (pub_texto, "pub_pathMult", pub_fechahora, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id) 
                    VALUES ('${pub_texto}','${pub_pathMult}', now(), '${pub_tipo}','${pub_duracion}','${pub_estado}',
                    '${usuario_id}', '${perfilusu_id}')`;*/

    

    result = await pool.query('INSERT INTO publicacion (pub_texto, usuario_id) VALUES ($1, $2) RETURNING pub_id;', [pub_texto, usuario_id]);
    
    res.json({
      "pub_id": result.rows[0].pub_id,
      "pub_texto": pub_texto,
      "usuario_id": usuario_id
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
  let query = `SELECT pub_id, pub_texto, usuario_id  FROM publicacion WHERE usuario_id=${usuario_id}`;
  let result = await pool.query(query);
  if (result.rows == 0)
    return res.json({ message: "No hay publicaciones", result: [] });
  res.json(result.rows);
}

// Elimina una publicacion a partir de su ID
async function deletePost(req, res) {
  console.log("Hola men");
  const pub_id = parseInt(req.params.pub_id);
  console.log("ID de publicacion: " + pub_id);
  let query = `DELETE FROM publicacion WHERE pub_id = ${pub_id}`;
  let result = await pool.query(query);
  res.json({ n: result.rowCount });
}

async function updatePost(req, res) {
  console.log("Dentro de update");
  const pub_id = parseInt(req.params.pub_id);
  //const {  } = req.body;
  res.json({});
}

// Add image on post
/*async function updatePerfilPhoto(req, res) {
  const { id } = req.params;
  let perfil_path_foto = `faces/${req.file.originalname}`

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
}*/

module.exports = {
  savepost,
  getPostsUser,
  deletePost,
  updatePost
};
