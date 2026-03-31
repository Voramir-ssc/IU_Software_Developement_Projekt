import express, { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();

/**
 * GET /api/tasks
 * Ruft eine Liste aller Aufgaben aus der Datenbank ab.
 * Fuellt das Feld 'assignedTo' mit dem Namen und der Rolle des Benutzers, um Kontext zu bieten.
 * 
 * @route GET /api/tasks
 * @returns {Task[]} 200 - Array von Aufgaben-Objekten mit Details zum zugewiesenen Benutzer
 * @returns {Error} 500 - Interner Serverfehler, wenn die Datenbankabfrage fehlschlaegt
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
 * Erstellt eine neue Aufgabe in der Datenbank und weist sie einem Benutzer zu.
 * 
 * @route POST /api/tasks
 * @param {string} title.body.required - Titel der Aufgabe
 * @param {string} description.body - Beschreibung der Aufgabe
 * @param {string} assignedTo.body.required - Benutzer-ID, der die Aufgabe zugewiesen wird
 * @param {number} pointsReward.body.required - Punktebelohnung bei Abschluss
 * @returns {Task} 201 - Das neu erstellte Aufgaben-Objekt
 * @returns {Error} 400 - Validierungsfehler oder ungueltige Anfrage
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
 * Markiert eine spezifische Aufgabe als 'erledigt' (done) und schreibt dem Benutzer die Punkte gut.
 * Verhindert, dass Punkte mehrfach fuer dieselbe Aufgabe vergeben werden.
 * 
 * @route PUT /api/tasks/:id/done
 * @param {string} id.path.required - Die ID der zu erledigenden Aufgabe
 * @returns {object} 200 - Erfolgsmeldung, aktualisierte Aufgabe und aktueller Punktestand
 * @returns {Error} 404 - Aufgabe nicht gefunden
 * @returns {Error} 400 - Aufgabe bereits erledigt oder Aktualisierung fehlgeschlagen
 */
router.put('/:id/done', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status === 'done') return res.status(400).json({ message: 'Task already completed' });

    // Status der Aufgabe aktualisieren
    task.status = 'done';
    await task.save();

    // Punkte dem Benutzer gutschreiben
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
 * Ruft den aktuellen Punktestand fuer einen spezifischen Benutzer ab.
 * 
 * @route GET /api/tasks/user/:id/points
 * @param {string} id.path.required - Die ID des Benutzers
 * @returns {object} 200 - Enthaelt die Gesamtpunktzahl (z.B. { points: 150 })
 * @returns {Error} 400 - Datenbankabfrage fehlgeschlagen
 */
router.get('/user/:id/points', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ points: user?.points || 0 });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching points' });
  }
});

export default router;
