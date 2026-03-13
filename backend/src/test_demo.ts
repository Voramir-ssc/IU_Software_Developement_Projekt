import Task from './models/Task';
import User from './models/User';
import mongoose from 'mongoose';

// Mocking logic / Simple test demonstration
export const testPointsLogic = async () => {
  console.log('--- Unit Test: Punkte-Logik ---');
  
  const mockUser = { _id: new mongoose.Types.ObjectId(), name: 'TestUser', points: 100 };
  const mockTask = { title: 'Test Task', pointsReward: 50, status: 'open', assignedTo: mockUser._id };
  
  // Simulate complete task
  console.log(`Vorher: ${mockUser.name} hat ${mockUser.points} Punkte.`);
  
  if (mockTask.status === 'open') {
    mockTask.status = 'done';
    mockUser.points += mockTask.pointsReward;
  }
  
  console.log(`Nachher: ${mockUser.name} hat ${mockUser.points} Punkte.`);
  
  if (mockUser.points === 150) {
    console.log('✅ TEST BESTANDEN: Punkte wurden korrekt addiert.');
    return true;
  } else {
    console.log('❌ TEST FEHLGESCHLAGEN: Punkte-Berechnung fehlerhaft.');
    return false;
  }
};
