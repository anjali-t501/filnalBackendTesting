const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../../middleware/auth');
const { createEssentialsType, allEssentialsType, updateEssentialType, deleteEssentialType } = require('../../controllers/categories/dailyEssentialController');
const router = express.Router();

router.post('/essential/create', isAuthenticatedUser,authorizeRoles('admin') ,createEssentialsType)
router.get('/essential',allEssentialsType)
router.put('/essential/update/:type_id', isAuthenticatedUser,authorizeRoles('admin') ,updateEssentialType)
router.delete('/essential/delete/:type_id', isAuthenticatedUser,authorizeRoles('admin') ,deleteEssentialType)

module.exports = router;
