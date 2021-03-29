const express = require('express');
const router = express.Router();

const productController = require('./../controllers/productController');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviewController = require('../controllers/reviewController');

router.route('/')
    .post(authController.protect,authController.restrictTo('admin'),userController.uploadUsersPhoto,userController.resizeUserPhoto,productController.addProduct)
    .get(productController.getAllProducts)

router.get('/laptop',productController.getProductByType('laptop'));
router.get('/phones',productController.getProductByType('phone'));

router.route('/search/:item')
    .get(productController.doSearch)

router.route('/:id')
    .get(productController.getProduct)
    .patch(productController.update)
    .delete(productController.deleteProduct)

router.route('/:id/reviews')
    .post(authController.protect,reviewController.createReview)
    .get(reviewController.getReviewsByProductID);

module.exports = router;