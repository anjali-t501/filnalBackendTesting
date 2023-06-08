const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../../middleware/auth');
const { createAnimalType, allAnimalType, updateAnimalType, deleteAnimalType } = require('../../controllers/categories/animalController');
const router = express.Router();

router.post('/animal/create', isAuthenticatedUser,authorizeRoles('admin') ,createAnimalType)
router.get('/animal' ,allAnimalType)
router.put('/animal/update/:type_id' ,isAuthenticatedUser,authorizeRoles('admin'),updateAnimalType)
router.delete('/animal/delete/:type_id' ,isAuthenticatedUser,authorizeRoles('admin'),deleteAnimalType)

module.exports = router;
