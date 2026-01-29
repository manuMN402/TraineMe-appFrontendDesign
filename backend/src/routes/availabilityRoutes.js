import express from 'express';
import { addAvailability, getAvailabilities, deleteAvailability } from '../controllers/availabilityController.js';
import { authMiddleware, isTrainer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isTrainer, addAvailability);
router.get('/:trainerId', getAvailabilities);
router.delete('/:availabilityId', authMiddleware, isTrainer, deleteAvailability);

export default router;
