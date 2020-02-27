const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { pool } = require("../connect-database");

// codifica imagen
function base64_encode(file) {
  var bitmap = fs.readFileSync(file);            // read binary data
  return Buffer.from(bitmap).toString("base64"); // convert binary data to base64 encoded string
}

// SELECT - Obtiene todas las publicaciones del usuario especificado determinado por su ID
async function getPostsUser(req, res) {
  const { usuario_id } = req.params;
  let query = `SELECT pub_id, pub_texto, "pub_pathMult", usuario_id  FROM publicacion WHERE usuario_id=${usuario_id}`;
  let result = await pool.query(query);
  if (result.rows == 0)
    return res.json({ message: "No hay publicaciones", result: [] });

  result.rows.forEach(post => {
    if (post.pub_pathMult != "") {
      var base64str = base64_encode(post.pub_pathMult);
      post.pub_pathMult = base64str;
      post.pub_pathMult_name = path.basename(post.pub_pathMult);
    }
  });
  res.json(result.rows);
}

// INSERT - Registra una publicacion 
async function savepost(req, res) {
  let perfil_path_foto = "";
  ( req.files[0] == undefined ) ? perfil_path_foto = "" : perfil_path_foto = `faces/${req.files[0].originalname}`;

  const pub_texto = req.body.pub_texto;
  const usuario_id = req.body.usuario_id;
  console.log("Savepost...");
  console.log(pub_texto, usuario_id, req.files[0]);
  console.log("End savepost");

  /**
   * pub_pathMult, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id
   */
  try {
    /*query = `INSERT INTO publicacion
                    (pub_texto, "pub_pathMult", pub_fechahora, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id) 
                    VALUES ('${pub_texto}','${pub_pathMult}', now(), '${pub_tipo}','${pub_duracion}','${pub_estado}',
                    '${usuario_id}', '${perfilusu_id}')`;*/

    result = await pool.query(
      'INSERT INTO publicacion (pub_texto, "pub_pathMult", usuario_id) VALUES ($1, $2, $3) RETURNING pub_id;',
      [pub_texto, perfil_path_foto, usuario_id]
    );

    
      if (perfil_path_foto != "") {
        var base64str = base64_encode(perfil_path_foto);
        //perfil_path_foto = ;
        //perfil_path_foto_name = path.basename(perfil_path_foto);

        res.json({
          pub_id: result.rows[0].pub_id,
          pub_texto: pub_texto,
          pub_pathMult: base64str,
          pub_pathMult_name: path.basename(base64str),
          usuario_id: usuario_id
        });
      } else {
        res.json({
          pub_id: result.rows[0].pub_id,
          pub_texto: pub_texto,
          usuario_id: usuario_id
        });
      }
    

    
    
  } catch (error) {
    return res.json({
      message: "Error al registrar publicacion",
      error: error
    });
  }
}

// DELETE - Elimina una publicacion a partir de su ID
async function deletePost(req, res) {
  const pub_id = parseInt(req.params.pub_id);

  let result = await pool.query('SELECT "pub_pathMult" FROM publicacion WHERE pub_id = $1', [pub_id]);
  (result.rows[0].pub_pathMult != "") ? fs.unlinkSync(result.rows[0].pub_pathMult):"";
  
  result = await pool.query('DELETE FROM publicacion WHERE pub_id = $1', [pub_id]);

  res.json({ n: result.rowCount });
}

// UPDATE - Actualiza publicacion
async function updatePost(req, res) {
  console.log("Dentro de update");
  const pub_id = parseInt(req.params.pub_id);
  //const {  } = req.body;
  res.json({});
}

module.exports = {
  savepost,
  getPostsUser,
  deletePost,
  updatePost
};
