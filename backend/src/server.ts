import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/familien-hero')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

/**
 * Endpunkt fuer Health-Checks, um sicherzustellen, dass die API erreichbar ist.
 * Nuetzlich fuer Monitoring und initiales Verbindungstests vom Frontend aus.
 * 
 * @route GET /api/health
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Familien Hero API is running!' });
});

/**
 * Initialisiert den Server auf dem angegebenen PORT.
 * Der Server startet nur, wenn er sich nicht in einer Testumgebung befindet,
 * um Konflikte ("address already in use") bei Integration-Tests zu vermeiden.
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Exportiert die Express-Instanz fuer Integration-Tests (z.B. vitest / supertest).
export default app;
