const express = require('express');
const router = express.Router();

const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

router.get('/login',viewController.viewLogin)
router.get('/',authController.isLoggedIn,viewController.getHome);
router.get('/aboutme',authController.protect,viewController.aboutMe);
router.get('/cart',authController.isLoggedIn,viewController.cart);
router.get('/phones',authController.isLoggedIn,viewController.getTypeProduct('phone'))
router.get('/laptops',authController.isLoggedIn,viewController.getTypeProduct('laptop'))
router.get('/products',authController.isLoggedIn,viewController.getAllProducts)
router.get('/additem',authController.protect,authController.restrictTo('admin'),viewController.addItem);
router.get('/:slug',authController.isLoggedIn,viewController.getProduct);




    
module.exports = router;