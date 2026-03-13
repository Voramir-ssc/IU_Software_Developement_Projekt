import express, { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name role');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  const { title, description, assignedTo, pointsReward } = req.body;
  try {
    const newTask = new Task({ title, description, assignedTo, pointsReward });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

// Mark task as done and reward points
router.put('/:id/done', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status === 'done') return res.status(400).json({ message: 'Task already completed' });

    // Update Task Status
    task.status = 'done';
    await task.save();

    // Reward Points to User
    const user = await User.findById(task.assignedTo);
    if (user) {
      user.points += task.pointsReward;
      await user.save();
    }

    res.json({ message: 'Task completed and points rewarded', task, userPoints: user?.points });
  } catch (err) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// Get User Points
router.get('/user/:id/points', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ points: user?.points || 0 });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching points' });
  }
});

export default router;
