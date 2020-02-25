const { Router } = require('express');
const user = require('../controllers/users.js');
const validate = require('../src/validaciones.js');

// objeto que permite definir rutas
const router = Router();

// Ruta de registro de usuario
router.post('/register', user.register);
// Ruta de inicio de sesion
router.post('/login', user.login);
// Ruta para obtener usuarios
router.get('/', user.getUsuarios);
// Ruta para obtener ciudades
router.get('/ciudades', user.getCiudades);
// Ruta que inicia sesion con reconocimiento facial
router.post('/recFacial', user.recFacialLogin);
// Ruta para obtener un usuario
router.post('/', validate.verifyToken, user.getUsuario);
// Ruta para obtener seguidores de usuario logueado
router.get('/:id/seguidores', validate.verifyToken, user.getSeguidores);
// Ruta para obtener seguidos de usuario logueado
router.get('/:id/seguidos', validate.verifyToken, user.getSeguidos);
// Ruta para obtener amigos de usuario logueado
router.get('/:id/amigos', validate.verifyToken, user.getAmigos);
//Ruta para obtener personas en una busqueda
router.get('/personas/:usr_busq', user.getPersonas);
// Ruta para editar foto de perfil
router.post('/:id/update-perfil-photo', validate.verifyToken, user.updatePerfilPhoto);
// Ruta para editar portada
router.post('/:id/update-portada-photo', validate.verifyToken, user.updatePortadaPhoto);
// Ruta para actualizar userLogin de un usuario
router.put('/:iduser', validate.verifyToken, user.updateUserLogin);

//exportar objeto
module.exports = router;