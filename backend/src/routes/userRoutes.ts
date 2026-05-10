import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API-Endpunkte zur Abfrage von Benutzern (Helden)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Ruft eine Liste aller Benutzer ab
 *     tags: [Users]
 *     description: Ruft eine Liste aller Benutzer aus der Datenbank ab. Wird verwendet, um Suchfelder oder Zuweisungs-Dropdowns im Frontend zu füllen.
 *     responses:
 *       200:
 *         description: Ein Array von Benutzer-Objekten.
 *       500:
 *         description: Interner Serverfehler beim Abrufen der Benutzer.
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
