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
 * Endpoint for health checks to ensure the API is reachable.
 * Useful for monitoring and initial connection testing from the frontend.
 * 
 * @route GET /api/health
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Familien Hero API is running!' });
});

/**
 * Initializes the server on the specified PORT.
 * Only starts listening if not currently in a test environment,
 * preventing 'address already in use' errors during integration tests.
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the Express app instance for use in integration tests (e.g., vitest / supertest).
export default app;
