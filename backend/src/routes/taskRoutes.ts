import express, { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();

/**
 * GET /api/tasks
 * Ruft eine Liste aller Aufgaben aus der Datenbank ab.
 * Das Feld 'assignedTo' wird mit dem Namen und der Rolle des Benutzers befüllt.
 * 
 * @returns {Task[]} 200 - Array von Aufgaben-Objekten
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name role');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Aufgaben' });
  }
});

/**
 * POST /api/tasks
 * Erstellt eine neue Aufgabe und weist sie einem Benutzer zu.
 * 
 * @param {string} title.body.required - Titel der Aufgabe
 * @param {string} assignedTo.body.required - Benutzer-ID des Zuständigen
 * @param {number} pointsReward.body.required - Sterne-Belohnung
 * @returns {Task} 201 - Das neu erstellte Aufgaben-Objekt
 */
router.post('/', async (req: Request, res: Response) => {
  const { title, description, assignedTo, pointsReward } = req.body;
  try {
    const newTask = new Task({ title, description, assignedTo, pointsReward });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Fehler beim Erstellen der Aufgabe' });
  }
});

/**
 * PUT /api/tasks/:id/done
 * Markiert eine Aufgabe als 'erledigt' und schreibt die Punkte dem Benutzer gut.
 * Verhindert mehrfache Gutschriften für dieselbe Aufgabe.
 */
router.put('/:id/done', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Aufgabe nicht gefunden' });
    if (task.status === 'done') return res.status(400).json({ message: 'Aufgabe bereits abgeschlossen' });

    // Status aktualisieren
    task.status = 'done';
    await task.save();

    // Punkte dem Benutzer gutschreiben
    const user = await User.findById(task.assignedTo);
    if (user) {
      user.points += task.pointsReward;
      await user.save();
    }

    res.json({ message: 'Aufgabe abgeschlossen und Punkte vergeben', task, userPoints: user?.points });
  } catch (err) {
    res.status(400).json({ message: 'Fehler beim Aktualisieren der Aufgabe' });
  }
});

/**
 * GET /api/tasks/user/:id/points
 * Ruft den aktuellen Punktestand eines spezifischen Benutzers ab.
 */
router.get('/user/:id/points', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ points: user?.points || 0 });
  } catch (err) {
    res.status(400).json({ message: 'Fehler beim Abrufen des Punktestands' });
  }
});

/**
 * GET /api/tasks/users
 * Ruft eine Liste aller Benutzer ab, um Helden im Dashboard anzuzeigen.
 */
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Helden' });
  }
});

export default router;
