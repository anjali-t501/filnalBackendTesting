const express = require('express');
const { authorizeRoles, isAuthenticatedUser } = require('../middleware/auth');
const { createProduct, showAllProducts, getProductDetails, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router = express.Router();

//products routes

router.post('/product/create', isAuthenticatedUser,authorizeRoles('admin'), createProduct);
router.get('/products',  showAllProducts);
router.route("/product/:id").get(getProductDetails)
router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)


//reviews routes 
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/review").get(getProductReviews)
.delete(isAuthenticatedUser, deleteReview)

router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);


module.exports = router;