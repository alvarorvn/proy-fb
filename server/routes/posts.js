const { Router } = require('express');
const validate = require('../src/validaciones.js');
const { savepost, getPostsUser, deletePost, updatePost } = require('../controllers/posts.js');

// objeto que permite definir rutas
const router = Router();

router.post('/savepost', savepost);                                                     // Ruta de registro de usuario
router.get('/getpostsuser/:usuario_id', getPostsUser);                                  // Obtiene todas las publicaciones del usuario especificado
router.delete('/deletepost/:pub_id', deletePost);
router.put('/updatepost/:pub_id', updatePost);
//router.post('/:id/addphoto', validate.verifyToken, user.updatePerfilPhoto);  // Agregar foto a post

//exportar objeto
module.exports = router;