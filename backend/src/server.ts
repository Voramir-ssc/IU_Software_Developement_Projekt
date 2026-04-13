import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Verbindung
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/familien-hero')
    .then(() => console.log('Erfolgreich mit MongoDB verbunden'))
    .catch(err => console.error('Fehler bei der MongoDB-Verbindung:', err));
}

// Routen-Importe
import taskRoutes from './routes/taskRoutes';
import rewardRoutes from './routes/rewardRoutes';

app.use('/api/tasks', taskRoutes);
app.use('/api/rewards', rewardRoutes);

/**
 * Endpunkt für Health-Checks, um die Erreichbarkeit der API zu prüfen.
 * Wird vom Frontend verwendet, um den Verbindungsstatus anzuzeigen.
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Familien Hero API ist betriebsbereit!' });
});

/**
 * Initialisierung des Servers auf dem in der Umgebung konfigurierten Port.
 * Startet den Listener nur, wenn keine Testumgebung aktiv ist.
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
}

// Export der Express-App für Integrationstests
export default app;
