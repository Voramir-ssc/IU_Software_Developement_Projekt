import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

/**
 * GET /api/users
 * Retrieves a list of all users from the database.
 * Used for populating search fields or assignment dropdowns in the frontend.
 * 
 * @route GET /api/users
 * @returns {User[]} 200 - Array of user objects
 * @returns {Error} 500 - Internal server error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

export default router;
