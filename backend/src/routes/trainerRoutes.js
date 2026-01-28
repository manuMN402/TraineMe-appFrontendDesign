const express = require('express');
const {
  createTrainerProfile,
  getTrainerProfile,
  updateTrainerProfile,
  getAllTrainers,
} = require('../controllers/trainerController');
const { authMiddleware, isTrainer } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/profile', authMiddleware, isTrainer, createTrainerProfile);
router.get('/profile/:trainerId', getTrainerProfile);
router.put('/profile', authMiddleware, isTrainer, updateTrainerProfile);
router.get('/search', getAllTrainers);

module.exports = router;
