import express from 'express';
import { register, login, getProfile, updateProfile, getUserById, updateUserById } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * REGISTER USER
 * POST /api/auth/register
 */
router.post('/register', register);

/**
 * LOGIN USER
 * POST /api/auth/login
 */
router.post('/login', login);

/**
 * GET CURRENT USER PROFILE
 * GET /api/auth/profile (requires authentication)
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * UPDATE USER PROFILE
 * PUT /api/auth/profile (requires authentication)
 */
router.put('/profile', authMiddleware, updateProfile);

/**
 * GET USER BY ID
 * GET /api/auth/users/:userId
 */
router.get('/users/:userId', getUserById);

/**
 * UPDATE USER BY ID
 * PUT /api/auth/users/:userId (requires authentication)
 */
router.put('/users/:userId', authMiddleware, updateUserById);

export default router;
