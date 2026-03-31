import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import Task from '../models/Task';
import User from '../models/User';

// Set generic environment to testing
process.env.NODE_ENV = 'test';

describe('Familien Hero Backend Integration Tests', () => {
  let testUserId: string;
  let testTaskId: string;

  beforeAll(async () => {
    // Note: ensure local MongoDB is running as requested in the documentation
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/familien-hero-test');
    }

    // Clean DB before starting tests
    await User.deleteMany({});
    await Task.deleteMany({});

    // Seed test data
    const user = new User({ name: 'TestUser', role: 'parent', points: 0 });
    const savedUser = await user.save();
    testUserId = savedUser._id.toString();

    const task = new Task({
      title: 'Tisch decken',
      assignedTo: testUserId,
      pointsReward: 10,
      status: 'open'
    });
    const savedTask = await task.save();
    testTaskId = savedTask._id.toString();
  });

  afterAll(async () => {
    // Cleanup and disconnect
    await User.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all structured tasks', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Tisch decken');
      // Should populate assignedTo
      expect(res.body[0].assignedTo.name).toBe('TestUser');
    });
  });

  describe('PUT /api/tasks/:id/done', () => {
    it('should mark task as completed and reward points', async () => {
      const res = await request(app).put(`/api/tasks/${testTaskId}/done`);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/completed/i);
      expect(res.body.task.status).toBe('done');
      
      // Points should be rewarded
      const userPointsRes = await request(app).get(`/api/tasks/user/${testUserId}/points`);
      expect(userPointsRes.status).toBe(200);
      expect(userPointsRes.body.points).toBe(10);
    });

    it('should return an error if task is already completed', async () => {
      const res = await request(app).put(`/api/tasks/${testTaskId}/done`);
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/already completed/i);
    });
  });
});
