import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const isTrainer = async (req, res, next) => {
  try {
    const trainerProfile = await prisma.trainerProfile.findUnique({
      where: { userId: req.user.id },
    });
    if (!trainerProfile) {
      return res.status(403).json({ error: 'User is not a trainer' });
    }
    req.trainerProfile = trainerProfile;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Authorization failed' });
  }
};

export const isUser = async (req, res, next) => {
  // Any authenticated user is considered a user
  next();
};
