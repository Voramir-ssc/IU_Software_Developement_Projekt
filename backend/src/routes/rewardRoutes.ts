import express, { Request, Response } from 'express';
import Reward from '../models/Reward';
import User from '../models/User';

const router = express.Router();

// Alle verfügbaren Belohnungen abrufen
router.get('/', async (req: Request, res: Response) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Belohnungen' });
  }
});

// Belohnung einlösen
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

// Neue Belohnung erstellen (für Setup/Administration)
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
