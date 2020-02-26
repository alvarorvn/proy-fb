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
// Ruta para agregar telefono
router.post('/add-telf', validate.verifyToken, biografia.addTelefono);
// Ruta para agregar direccion
router.post('/add-direccion', validate.verifyToken, biografia.addDireccion);
// Ruta para agregar apodo
router.post('/add-apodo', validate.verifyToken, biografia.addApodo);
// Ruta para agregar seguidor
router.post('/add-seguidor', validate.verifyToken, biografia.addSeguidor);
// Ruta para agregar solicitud de amistad
router.post('/add-soli', validate.verifyToken, biografia.addSoli);
// Ruta para agregar amigo
router.post('/add-amigo', validate.verifyToken, biografia.addAmigo);

// Ruta para obtener empleos de un usuario
router.get('/:perfilID/get-empleo', validate.verifyToken, biografia.getEmpleos);
// Ruta para obtener aptitudes de un usuario
router.get('/:perfilID/get-aptitudes', validate.verifyToken, biografia.getAptitudes);
// Ruta para obtener estudios de un usuario
router.get('/:perfilID/get-estudios', validate.verifyToken, biografia.getEstudios);
// Ruta para obtener telefonos de un usuario
router.get('/:perfilID/get-telf', validate.verifyToken, biografia.getTelefonos);
// Ruta para obtener direcciones de un usuario
router.get('/:perfilID/get-direccion', validate.verifyToken, biografia.getDirecciones);
// Ruta para obtener apodos de un usuario
router.get('/:perfilID/get-apodo', validate.verifyToken, biografia.getApodos);

// Ruta para borrar empleo de un usuario
router.delete('/:perfilID/delete-empleo/:empleoID', validate.verifyToken, biografia.deteleEmpleo);
// Ruta para borrar aptitud de un usuario
router.delete('/:perfilID/delete-aptitud/:aptitudID', validate.verifyToken, biografia.deteleAptitud);
// Ruta para borrar estudio de un usuario
router.delete('/:perfilID/delete-estudio/:univID', validate.verifyToken, biografia.deleteEstudio);
// Ruta para borrar telefono de un usuario
router.delete('/:perfilID/delete-telf/:telfID', validate.verifyToken, biografia.deleteTelefono);
// Ruta para borrar direccion de un usuario
router.delete('/:perfilID/delete-direccion/:dirID', validate.verifyToken, biografia.deleteDireccion);
// Ruta para borrar apodo de un usuario
router.delete('/:perfilID/delete-apodo/:apodoID', validate.verifyToken, biografia.deleteApodo);
// Ruta para borrar seguidor de un usuario
router.post('/delete-seguidor', validate.verifyToken, biografia.deleteSeguidor);
// Ruta para borrar solicitud de amistad de un usuario
router.post('/delete-soli', validate.verifyToken, biografia.deleteSolicitud);

// Ruta para actualizar empleo de un usuario
router.put('/:perfilID/update-empleo/:empleoID', validate.verifyToken, biografia.updateEmpleo);
// Ruta para actualizar aptitud de un usuario
router.put('/:perfilID/update-aptitud/:aptitudID', validate.verifyToken, biografia.updateAptitud);
// Ruta para actualizar estudio de un usuario
router.put('/:perfilID/update-estudio/:univID', validate.verifyToken, biografia.updateEstudio);
// Ruta para actualizar telefono de un usuario
router.put('/:perfilID/update-telf/:telfID', validate.verifyToken, biografia.updateTelefono);
// Ruta para actualizar direccion de un usuario
router.put('/:perfilID/update-direccion/:dirID', validate.verifyToken, biografia.updateDireccion);
// Ruta para actualizar religion de un usuario
router.put('/:perfilID/update-religion', validate.verifyToken, biografia.updateReligion);
// Ruta para actualizar interes de un usuario
router.put('/:perfilID/update-interes', validate.verifyToken, biografia.updateInteres);
// Ruta para actualizar interes de un usuario
router.put('/:perfilID/update-info', validate.verifyToken, biografia.updateInformacion);
// Ruta para actualizar apodo de un usuario
router.put('/:perfilID/update-apodo/:apodoID', validate.verifyToken, biografia.updateApodo);

//exportar objeto
module.exports = router;