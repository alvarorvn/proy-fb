const { Router } = require('express');
const user = require('../controllers/users.js');

// objeto que permite definir rutas
const router = Router();

router.post('/register', user.register);

//exportar objeto
module.exports = router;