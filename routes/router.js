var express = require('express');
var router = express.Router();
var middleware = require('../middleware');

var userController = require('../controller/userController');
var hotelController = require('../controller/hotelController');

router.post('/login', userController.login);
router.get('/checkAuth',[middleware.checkAuth]); // for testing purpose
router.post('/signup',[middleware.checkIsAdmin],userController.signUp); 
router.post('/addhotel',[middleware.checkAuth],hotelController.addHotel); 
router.put('/updatehotel',[middleware.checkAuth],hotelController.updateHotel); 
router.get('/gethotel',[middleware.checkAuth],hotelController.getHotel); 
// router.post('/password',[middleware.checkAuth], userController.setPassword);
// router.get('/user',[middleware.checkAuth], userController.getUsers);
// router.get('/user/:username',[middleware.checkAuth], userController.getUser);
// router.post('/user',[middleware.checkAuth], userController.insertUser);
// router.delete('/user/:username',[middleware.checkAuth], userController.deleteUser);


module.exports = router;