const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../../middleware/auth');
const { createTreatmentType, allTreatmentType, updatetreatmentType, deleteTreatmentType } = require('../../controllers/categories/treatmentTypeControllers');
const router = express.Router();

router.post('/treatment/create', isAuthenticatedUser,authorizeRoles('admin') ,createTreatmentType)
router.get('/treatment' ,allTreatmentType)
router.put('/treatment/update/:type_id' ,isAuthenticatedUser,authorizeRoles('admin'),updatetreatmentType)
router.delete('/treatment/delete/:type_id' ,isAuthenticatedUser,authorizeRoles('admin'),deleteTreatmentType)

module.exports = router;
