const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../../middleware/auth');
const { createMedicalType, allmedicalCareType, updatemedicalCareType, deleteMedicalCareType } = require('../../controllers/categories/medicalTypeController');
const router = express.Router();

router.post('/medical/create', isAuthenticatedUser,authorizeRoles('admin') ,createMedicalType)
router.get('/medical',allmedicalCareType)
router.put('/medical/update/:type_id', isAuthenticatedUser,authorizeRoles('admin') ,updatemedicalCareType)
router.delete('/medical/delete/:type_id', isAuthenticatedUser,authorizeRoles('admin') ,deleteMedicalCareType)

module.exports = router;
