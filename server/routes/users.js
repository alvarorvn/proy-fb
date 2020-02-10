const { Router } = require('express');
const user = require('../controllers/users.js');
const validate = require('../src/validaciones.js');

// objeto que permite definir rutas
const router = Router();

// Ruta principal
router.get('/', validate.verifyToken, user.index);
// Ruta de registro de usuario
router.post('/register', user.register);
// Ruta de inicio de sesion
router.post('/login', user.login);
router.post('/publicar', (req, res) => {
    console.log(req.body);
    res.json({ resp: "HOLA" });
});
//exportar objeto
module.exports = router;
