const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.post('/logout',authController.protect,authController.logout);

router.patch('/updateme',authController.protect ,userController.updateMe);
router.get('/aboutme',authController.protect ,userController.aboutMe)

router.patch('/updatepassword',authController.protect ,authController.updatePassword)



router.get('/',authController.isLoggedIn,userController.getAllUsers);

module.exports = router;