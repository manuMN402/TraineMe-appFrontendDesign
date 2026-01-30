import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Hash password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Compare password
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT token
 */
export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};
