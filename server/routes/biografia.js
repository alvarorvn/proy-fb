const { Router } = require('express');
const user = require('../controllers/users');
const biografia = require('../controllers/biografia');
const validate = require('../src/validaciones');

// objeto que permite definir rutas
const router = Router();

// Ruta para agregar empleo
router.post('/add-empleo', validate.verifyToken, biografia.addEmpleo);

// Ruta para obtener empelos de un usuaro
router.get('/:perfilID/get-empleo', validate.verifyToken, biografia.getEmpleos);

//exportar objeto
module.exports = router;