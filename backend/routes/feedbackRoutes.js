const express = require('express');
const router = express.Router();
const {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedbackStatus,
  deleteFeedback
} = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');

// Public route for submitting feedback
router.post('/', createFeedback);

// Admin-only routes
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getFeedback);

router.route('/:id')
  .get(getFeedbackById)
  .delete(deleteFeedback);

router.route('/:id/status')
  .put(updateFeedbackStatus);

module.exports = router;





