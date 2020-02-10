const { Router } = require('express');
const user = require('../controllers/chats.js');
const validate = require('../src/validaciones.js');

// objeto que permite definir rutas
const router = Router();


//exportar objeto
module.exports = router;