const { Router } = require('express');
const user = require('../controllers/users');
const eventos = require('../controllers/eventos');
const validate = require('../src/validaciones');

// objeto que permite definir rutas
const router = Router();

// Ruta para agregar evento
router.post('/add-evento', validate.verifyToken, eventos.addEvento);

// Ruta para obtener evento
router.get('/get-evento', validate.verifyToken, eventos.addEvento);


//exportar objeto
module.exports = router;