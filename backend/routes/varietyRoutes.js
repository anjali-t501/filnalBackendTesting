const express = require('express');
const { authorizeRoles, isAuthenticatedUser } = require('../middleware/auth');
const { addVarieties, getVaritiesDetails, updateVarieties, deleteVarieties } = require('../controllers/varietyController');
const router = express.Router();


router.post('/varieties/create', isAuthenticatedUser,authorizeRoles('admin'), addVarieties);
router.route("/varieties/:id").get(getVaritiesDetails)
router.route("/admin/varieties/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateVarieties)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteVarieties)

module.exports = router;