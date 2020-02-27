const { Router } = require('express');
const marketplace = require('../controllers/marketplace.js');
const validate = require('../src/validaciones.js');

// objeto que permite definir rutas.
const router = Router();

// Obtener todas las ventas
router.get('/', validate.verifyToken, marketplace.listar);
// Obtener todas las ventas
router.get('/guardadas/:id', validate.verifyToken, marketplace.listarGuardadas);
// Obtener todas las ventas de un usuario
router.get('/ventas/:id', validate.verifyToken, marketplace.listarUsuario);
// Ruta de registro de venta
router.post('/register', validate.verifyToken, marketplace.register);
// Ruta para guardar ventas
router.post('/save', validate.verifyToken, marketplace.save);
// Ruta para actualizar venta
router.put('/update', validate.verifyToken, marketplace.update);
// Borrar venta
router.delete('/delete/:id', validate.verifyToken, marketplace.delete);
// Borrar venta guardada
router.delete(
  '/guardadas/delete/:id',
  validate.verifyToken,
  marketplace.deleteGuardada
);
// Obtener categorias
router.get('/categorias', validate.verifyToken, marketplace.listarCategorias);

//exportar objeto
module.exports = router;
