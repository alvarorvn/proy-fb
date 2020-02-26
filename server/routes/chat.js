const { Router } = require('express');
const chat = require('../controllers/chat');

// objeto que permite definir rutas
const router = Router();

// Ruta de registro de usuario
router.post('/nuevochat', chat.insertarChat);
router.get('/obtenerchats', chat.obtenerChatUser);

//exportar objeto
module.exports = router;