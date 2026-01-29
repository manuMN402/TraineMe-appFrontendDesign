import express from 'express';
import { createReview, getTrainerReviews, updateReview, deleteReview } from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/trainer/:trainerId', getTrainerReviews);
router.put('/:reviewId', authMiddleware, updateReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

export default router;
