import express from 'express';
import { register, login, getProfile, updateProfile, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// User CRUD
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:userId', authMiddleware, getUserById);
router.put('/users/:userId', authMiddleware, updateUserById);
router.delete('/users/:userId', authMiddleware, deleteUserById);

export default router; 
