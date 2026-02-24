const express = require('express');
const router = express.Router();
const {
  getServices,
  getService,
  createService,
  updateServiceStatus,
  deleteService,
  redeemFreeService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getServices)
  .post(createService);

router.post('/redeem-free-service', redeemFreeService);

router.route('/:id')
  .get(getService)
  .delete(deleteService);

router.put('/:id/status', updateServiceStatus);

module.exports = router;

