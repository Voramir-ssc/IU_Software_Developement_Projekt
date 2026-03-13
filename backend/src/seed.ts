import mongoose from 'mongoose';
import User from './models/User';
import Task from './models/Task';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/familien-hero');
    
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create Users
    const stefan = await User.create({ name: 'Stefan', role: 'parent', points: 0 });
    const alexandra = await User.create({ name: 'Alexandra', role: 'parent', points: 0 });
    const marlene = await User.create({ name: 'Marlene', role: 'child', points: 480 });

    console.log('Users seeded!');

    // Create Tasks
    await Task.create([
      { title: 'Geschirrspüler ausräumen', assignedTo: marlene._id, pointsReward: 20, status: 'open' },
      { title: 'Zimmer aufräumen', assignedTo: marlene._id, pointsReward: 50, status: 'open' },
      { title: 'Wohnzimmer saugen', assignedTo: stefan._id, pointsReward: 30, status: 'open' },
      { title: 'Einkauf planen', assignedTo: alexandra._id, pointsReward: 10, status: 'done' }
    ]);

    console.log('Tasks seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
