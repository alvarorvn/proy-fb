const pool = require('../database/conexion');

const marketplace = {};

// Función para obtener las todas ventas guaardadas
marketplace.listarGuardadas = async (req, res) => {
  const id = req.params.id;
  let query = `SELECT marketplace.* FROM marketplace INNER JOIN ventas_guardadas ON marketplace.venta_id = ventas_guardadas.venta_id AND ventas_guardadas.usuario_id = ${id} ORDER BY venta_id ASC`;
  const result = await pool.query(query);

  res.status(200).json(result.rows);
};

// Función para obtener las todas ventas
marketplace.listar = async (req, res) => {
  let query = `SELECT * FROM marketplace ORDER BY venta_id DESC`;
  const result = await pool.query(query);

  res.status(200).json(result.rows);
};

// Función para obtener las todas ventas de un usuario
marketplace.listarUsuario = async (req, res) => {
  const id = req.params.id;
  let query = `SELECT * FROM marketplace WHERE usuario_id = ${id} ORDER BY venta_id DESC`;
  const result = await pool.query(query);

  res.status(200).json(result.rows);
};

// Función para obtener las categorias
marketplace.listarCategorias = async (req, res) => {
  let query = `SELECT * FROM categoria ORDER BY categ_id ASC`;
  const result = await pool.query(query);

  res.status(200).json(result.rows);
};

// Funcion de registro de ventas
marketplace.register = async (req, res) => {
  const {
    venta_nombre,
    venta_detalle,
    venta_precio,
    venta_url,
    venta_estado,
    categ_id,
    usuario_id
  } = req.body;
  let query = `INSERT INTO marketplace
                    (venta_nombre, venta_detalle, venta_precio, venta_url, venta_estado, categ_id, usuario_id)
                    VALUES ('${venta_nombre}','${venta_detalle}','${venta_precio}','${venta_url}','${venta_estado}',${categ_id},${usuario_id})`;
  const result = await pool.query(query);

  res.status(200).json(result);
};

// Funcion para guardar venta
marketplace.save = async (req, res) => {
  const { venta_id, usuario_id } = req.body;
  let query = `INSERT INTO ventas_guardadas (venta_id, vguard_estado, usuario_id) VALUES ('${venta_id}', 'guardado', ${usuario_id})`;
  const result = await pool.query(query);

  res.status(200).json(result);
};

// Funcion de actualizar de ventas
marketplace.update = async (req, res) => {
  const {
    venta_id,
    venta_nombre,
    venta_detalle,
    venta_precio,
    venta_url,
    categ_id
  } = req.body;
  let query = `UPDATE marketplace SET venta_nombre = '${venta_nombre}', venta_detalle = '${venta_detalle}', venta_precio = ${venta_precio}, venta_url = '${venta_url}', categ_id = ${categ_id} WHERE venta_id = ${venta_id}`;
  const result = await pool.query(query);

  res.status(200).json(result);
};

// Funcion de eliminar de ventas
marketplace.delete = async (req, res) => {
  const id_venta = req.params.id;
  let query = `DELETE FROM marketplace WHERE venta_id = ${id_venta}`;
  const result = await pool.query(query);

  if (!result.rowCount) {
    res.status(404).json({ message: 'No se ha encontrado la venta' });
  }

  res.status(200).json({ message: 'Se ha eliminado correctamente' });
};

// Funcion de eliminar de ventas guardadas
marketplace.deleteGuardada = async (req, res) => {
  const id_venta = req.params.id;
  let query = `DELETE FROM ventas_guardadas WHERE venta_id = ${id_venta}`;
  const result = await pool.query(query);

  if (!result.rowCount) {
    res.status(404).json({ message: 'No se ha encontrado la venta' });
  }

  res.status(200).json({ message: 'Se ha eliminado correctamente' });
};

module.exports = marketplace;
