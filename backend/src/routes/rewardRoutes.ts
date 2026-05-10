import express, { Request, Response } from 'express';
import Reward from '../models/Reward';
import User from '../models/User';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rewards
 *   description: API-Endpunkte zur Verwaltung und Einlösung von Belohnungen
 */

/**
 * @swagger
 * /api/rewards:
 *   get:
 *     summary: Alle Belohnungen abrufen
 *     tags: [Rewards]
 *     description: Ruft eine Liste aller verfügbaren Belohnungen aus der Datenbank ab.
 *     responses:
 *       200:
 *         description: Ein Array von Belohnungs-Objekten.
 *       500:
 *         description: Fehler beim Abrufen der Belohnungen.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Belohnungen' });
  }
});

/**
 * @swagger
 * /api/rewards/redeem:
 *   post:
 *     summary: Belohnung einlösen
 *     tags: [Rewards]
 *     description: Zieht die Kosten einer Belohnung vom Punktekonto des Benutzers ab.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rewardId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Belohnung erfolgreich eingelöst.
 *       400:
 *         description: Nicht genügend Sterne oder fehlender Parameter.
 *       404:
 *         description: Benutzer oder Belohnung nicht gefunden.
 */
router.post('/redeem', async (req: Request, res: Response) => {
  const { rewardId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    const reward = await Reward.findById(rewardId);

    if (!user || !reward) {
      return res.status(404).json({ message: 'Benutzer oder Belohnung nicht gefunden' });
    }

    if (user.points < reward.cost) {
      return res.status(400).json({ message: 'Nicht genügend Sterne vorhanden' });
    }

    // Punkte abziehen
    user.points -= reward.cost;
    await user.save();

    res.json({ message: 'Belohnung erfolgreich eingelöst!', remainingPoints: user.points });
  } catch (err) {
    res.status(400).json({ message: 'Fehler beim Einlösen der Belohnung' });
  }
});

/**
 * @swagger
 * /api/rewards:
 *   post:
 *     summary: Neue Belohnung erstellen
 *     tags: [Rewards]
 *     description: Erstellt eine neue Belohnung in der Datenbank (für Administration).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               cost:
 *                 type: number
 *               icon:
 *                 type: string
 *     responses:
 *       201:
 *         description: Das neu erstellte Belohnungs-Objekt.
 *       400:
 *         description: Fehler beim Erstellen.
 */
router.post('/', async (req: Request, res: Response) => {
  const { title, description, cost, icon } = req.body;
  try {
    const newReward = new Reward({ title, description, cost, icon });
    await newReward.save();
    res.status(201).json(newReward);
  } catch (err) {
    res.status(400).json({ message: 'Fehler beim Erstellen der Belohnung' });
  }
});

export default router;
