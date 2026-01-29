import express from 'express';
import { createTrainerProfile, getTrainerProfile, updateTrainerProfile, getAllTrainers, deleteTrainerProfile } from '../controllers/trainerController.js';
import { authMiddleware, isTrainer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/profile', authMiddleware, isTrainer, createTrainerProfile);
router.get('/profile/:trainerId', getTrainerProfile);
router.put('/profile', authMiddleware, isTrainer, updateTrainerProfile);
router.delete('/profile', authMiddleware, isTrainer, deleteTrainerProfile);
router.get('/search', getAllTrainers);

export default router; 
