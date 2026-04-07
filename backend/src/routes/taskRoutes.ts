import express, { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();

/**
 * GET /api/tasks
 * Retrieves a list of all tasks from the database.
 * Populates the 'assignedTo' field with the user's name and role to provide context.
 * 
 * @route GET /api/tasks
 * @returns {Task[]} 200 - Array of task objects with populated user details
 * @returns {Error} 500 - Internal server error if database query fails
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name role');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

/**
 * POST /api/tasks
 * Creates a new task in the database and assigns it to a user.
 * 
 * @route POST /api/tasks
 * @param {string} title.body.required - Title of the task
 * @param {string} description.body - Description of the task
 * @param {string} assignedTo.body.required - User ID to assign the task to
 * @param {number} pointsReward.body.required - Points rewarded upon completion
 * @returns {Task} 201 - The newly created task object
 * @returns {Error} 400 - Validation error or bad request
 */
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

/**
 * PUT /api/tasks/:id/done
 * Marks a specific task as 'done' and credits the associated points to the assigned user.
 * Prevents rewarding points multiple times for the same task.
 * 
 * @route PUT /api/tasks/:id/done
 * @param {string} id.path.required - The ID of the task to complete
 * @returns {object} 200 - Success message, updated task and updated user points
 * @returns {Error} 404 - Task not found
 * @returns {Error} 400 - Task already completed or update failed
 */
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

/**
 * GET /api/tasks/user/:id/points
 * Retrieves the total accumulated points for a specific user.
 * 
 * @route GET /api/tasks/user/:id/points
 * @param {string} id.path.required - The ID of the user
 * @returns {object} 200 - Contains the points total (e.g. { points: 150 })
 * @returns {Error} 400 - Database query failed
 */
router.get('/user/:id/points', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ points: user?.points || 0 });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching points' });
  }
});

/**
 * GET /api/tasks/users
 * Retrieves a list of all users to display points and heroes in the dashboard.
 * 
 * @route GET /api/tasks/users
 * @returns {User[]} 200 - Array of all user objects
 */
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

export default router;
