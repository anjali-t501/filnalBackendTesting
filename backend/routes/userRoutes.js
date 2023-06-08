const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser, addToCart, getCartItems, removeCartItem } = require('../controllers/userController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} =  require('../middleware/auth')

router.route("/register").post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser ,getUserDetails)

router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)


router.route('/me/update').put(isAuthenticatedUser,updateProfile)
// router.route('/add-to-cart').post(isAuthenticatedUser, addToCart)
// router.route('/cart-items/:id').get(isAuthenticatedUser, getCartItems)
// router.delete('/cart/:userId/items/:itemId', removeCartItem);

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser)

router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles('admin'),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

router.route('/logout').get(logout)



module.exports = router;

