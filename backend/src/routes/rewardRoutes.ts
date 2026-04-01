import express, { Request, Response } from 'express';
import Reward from '../models/Reward';
import User from '../models/User';

const router = express.Router();

// Get all available rewards
router.get('/', async (req: Request, res: Response) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rewards' });
  }
});

// Redeem a reward
router.post('/redeem', async (req: Request, res: Response) => {
  const { rewardId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    const reward = await Reward.findById(rewardId);

    if (!user || !reward) {
      return res.status(404).json({ message: 'User or Reward not found' });
    }

    if (user.points < reward.cost) {
      return res.status(400).json({ message: 'Not enough points' });
    }

    // Deduct points
    user.points -= reward.cost;
    await user.save();

    res.json({ message: 'Reward redeemed successfully!', remainingPoints: user.points });
  } catch (err) {
    res.status(400).json({ message: 'Error redeeming reward' });
  }
});

// Create a new reward (for setup)
router.post('/', async (req: Request, res: Response) => {
  const { title, description, cost, icon } = req.body;
  try {
    const newReward = new Reward({ title, description, cost, icon });
    await newReward.save();
    res.status(201).json(newReward);
  } catch (err) {
    res.status(400).json({ message: 'Error creating reward' });
  }
});

export default router;
