const express = require('express');
const {
  addAvailability,
  getAvailabilities,
  deleteAvailability,
} = require('../controllers/availabilityController');
const { authMiddleware, isTrainer } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isTrainer, addAvailability);
router.get('/:trainerId', getAvailabilities);
router.delete('/:availabilityId', authMiddleware, isTrainer, deleteAvailability);

module.exports = router;
