const { Router } = require('express');
const pages = require('./../controllers/page');
const auth = require('./../middleware/auth');

const router = Router();

//users
router.get('/user', auth, pages.searchUser);

// publications
router.post('/publish', auth, pages.publish);
router.get('/publish/images/:id', auth, pages.publishImages);
router.get('/publish/:id', auth, pages.publishList);

// follow
router.post('/follow/:id', auth, pages.follow);
router.get('/followers/:id', auth, pages.getFollows);

// roles
router.post('/admin', auth, pages.admin);
router.put('/admin/remove', auth, pages.adminRemove);
router.get('/admin/:page', auth, pages.getAdmins)

// 
router.get('/', auth, pages.list);
router.get('/search', auth, pages.search);
router.get('/:id', auth, pages.getById);

//
router.post('/', auth, pages.register);
router.put('/:id', auth, pages.update);
router.delete('/:id', auth, pages.destroy);

// images
router.get('/img/:type/:imageFile', pages.getImage);



module.exports = router;
