const express = require('express');
const {
  createBooking,
  getUserBookings,
  getTrainerBookings,
  updateBookingStatus,
  cancelBooking,
} = require('../controllers/bookingController');
const { authMiddleware, isUser, isTrainer } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isUser, createBooking);
router.get('/user/history', authMiddleware, isUser, getUserBookings);
router.get('/trainer/requests', authMiddleware, isTrainer, getTrainerBookings);
router.put('/:bookingId/status', authMiddleware, isTrainer, updateBookingStatus);
router.put('/:bookingId/cancel', authMiddleware, cancelBooking);

module.exports = router;
