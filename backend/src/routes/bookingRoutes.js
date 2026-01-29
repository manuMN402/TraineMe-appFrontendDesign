import express from 'express';
import { createBooking, getUserBookings, getTrainerBookings, updateBookingStatus, cancelBooking } from '../controllers/bookingController.js';
import { authMiddleware, isUser, isTrainer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isUser, createBooking);
router.get('/user/history', authMiddleware, isUser, getUserBookings);
router.get('/trainer/requests', authMiddleware, isTrainer, getTrainerBookings);
router.put('/:bookingId/status', authMiddleware, isTrainer, updateBookingStatus);
router.put('/:bookingId/cancel', authMiddleware, cancelBooking);

export default router;
