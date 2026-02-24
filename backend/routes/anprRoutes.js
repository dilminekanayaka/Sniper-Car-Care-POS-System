const express = require('express');
const router = express.Router();
const {
  detectPlate,
  registerFromANPR,
  sendWelcomeFromDashboard,
} = require('../controllers/anprController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/detect', detectPlate);
router.post('/register', registerFromANPR);
router.post('/send-welcome', sendWelcomeFromDashboard);

module.exports = router;

