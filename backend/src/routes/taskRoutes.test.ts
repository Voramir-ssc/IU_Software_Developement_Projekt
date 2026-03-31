import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server';
import Task from '../models/Task';
import User from '../models/User';

// Setze die Umgebung auf 'test'
process.env.NODE_ENV = 'test';

describe('Familien Hero Backend Integration-Tests', () => {
  let testUserId: string;
  let testTaskId: string;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Starte den In-Memory MongoDB Server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }

    // Datenbank vor den Tests bereinigen
    await User.deleteMany({});
    await Task.deleteMany({});

    // Testdaten erstellen (Seeding)
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
  }, 60000);

  afterAll(async () => {
    // Bereinigung und Verbindung trennen
    await User.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  describe('GET /api/health', () => {
    it('sollte den Health-Status zurueckgeben', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/tasks', () => {
    it('sollte alle strukturierten Aufgaben zurueckgeben', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Tisch decken');
      // Pruefen, ob assignedTo korrekt gefuellt (populated) wurde
      expect(res.body[0].assignedTo.name).toBe('TestUser');
    });
  });

  describe('PUT /api/tasks/:id/done', () => {
    it('sollte Aufgabe als erledigt markieren und Punkte gutschreiben', async () => {
      const res = await request(app).put(`/api/tasks/${testTaskId}/done`);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/completed/i);
      expect(res.body.task.status).toBe('done');
      
      // Punkte sollten dem Benutzer gutgeschrieben worden sein
      const userPointsRes = await request(app).get(`/api/tasks/user/${testUserId}/points`);
      expect(userPointsRes.status).toBe(200);
      expect(userPointsRes.body.points).toBe(10);
    });

    it('sollte einen Fehler zurueckgeben, wenn die Aufgabe bereits erledigt ist', async () => {
      const res = await request(app).put(`/api/tasks/${testTaskId}/done`);
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/already completed/i);
    });
  });
});
