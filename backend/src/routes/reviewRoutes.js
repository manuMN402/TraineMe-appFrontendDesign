const express = require('express');
const {
  createReview,
  getTrainerReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/trainer/:trainerId', getTrainerReviews);
router.put('/:reviewId', authMiddleware, updateReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
