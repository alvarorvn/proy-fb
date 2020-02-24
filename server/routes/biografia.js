const { Router } = require('express');
const user = require('../controllers/users');
const biografia = require('../controllers/biografia');
const validate = require('../src/validaciones');

// objeto que permite definir rutas
const router = Router();

// Ruta para agregar empleo
router.post('/add-empleo', validate.verifyToken, biografia.addEmpleo);
// Ruta para agregar aptitud
router.post('/add-aptitud', validate.verifyToken, biografia.addAptitud);
// Ruta para agregar estudio
router.post('/add-estudio', validate.verifyToken, biografia.addEstudio);

// Ruta para obtener empleos de un usuario
router.get('/:perfilID/get-empleo', validate.verifyToken, biografia.getEmpleos);
// Ruta para obtener aptitudes de un usuario
router.get('/:perfilID/get-aptitudes', validate.verifyToken, biografia.getAptitudes);
// Ruta para obtener estudios de un usuario
router.get('/:perfilID/get-estudios', validate.verifyToken, biografia.getEstudios);

// Ruta para borrar empleo de un usuario
router.delete('/:perfilID/delete-empleo/:empleoID', validate.verifyToken, biografia.deteleEmpleo);
// Ruta para borrar aptitud de un usuario
router.delete('/:perfilID/delete-aptitud/:aptitudID', validate.verifyToken, biografia.deteleAptitud);
// Ruta para borrar estudio de un usuario
router.delete('/:perfilID/delete-estudio/:univID', validate.verifyToken, biografia.deleteEstudio);

// Ruta para actualizar empleo de un usuario
router.put('/:perfilID/update-empleo/:empleoID', validate.verifyToken, biografia.updateEmpleo);
// Ruta para actualizar aptitud de un usuario
router.put('/:perfilID/update-aptitud/:aptitudID', validate.verifyToken, biografia.updateAptitud);
// Ruta para actualizar estudio de un usuario
router.put('/:perfilID/update-estudio/:univID', validate.verifyToken, biografia.updateEstudio);

//exportar objeto
module.exports = router;