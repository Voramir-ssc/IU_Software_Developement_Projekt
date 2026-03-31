import mongoose from 'mongoose';
import User from './models/User';
import Task from './models/Task';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/familien-hero');
    
    // Existierende Daten bereinigen
    await User.deleteMany({});
    await Task.deleteMany({});

    // Benutzer erstellen (Beispielkonfiguration fuer IU Projekt)
    const stefan = await User.create({ name: 'Stefan', role: 'parent', points: 0 });
    const alexandra = await User.create({ name: 'Alexandra', role: 'parent', points: 0 });
    const marlene = await User.create({ name: 'Marlene', role: 'child', points: 480 });

    console.log('Datenbank-Seeding fuer Benutzer abgeschlossen!');

    // Aufgaben erstellen (Initialer Stand)
    await Task.create([
      { title: 'Geschirrspüler ausräumen', assignedTo: marlene._id, pointsReward: 20, status: 'open' },
      { title: 'Zimmer aufräumen', assignedTo: marlene._id, pointsReward: 50, status: 'open' },
      { title: 'Wohnzimmer saugen', assignedTo: stefan._id, pointsReward: 30, status: 'open' },
      { title: 'Einkauf planen', assignedTo: alexandra._id, pointsReward: 10, status: 'done' }
    ]);

    console.log('Datenbank-Seeding fuer Aufgaben abgeschlossen!');
    process.exit(0);
  } catch (err) {
    console.error('Fehler beim Seeding:', err);
    process.exit(1);
  }
};

seed();
