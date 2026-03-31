import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

/**
 * GET /api/users
 * Ruft eine Liste aller Benutzer aus der Datenbank ab.
 * Wird verwendet, um Suchfelder oder Zuweisungs-Dropdowns im Frontend zu fuellen.
 * 
 * @route GET /api/users
 * @returns {User[]} 200 - Array von Benutzer-Objekten
 * @returns {Error} 500 - Interner Serverfehler
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
