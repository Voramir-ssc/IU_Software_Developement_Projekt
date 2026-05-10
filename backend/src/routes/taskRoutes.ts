import express, { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API-Endpunkte zur Verwaltung von Aufgaben (Tasks)
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Ruft eine Liste aller Aufgaben ab
 *     tags: [Tasks]
 *     description: Ruft eine Liste aller Aufgaben aus der Datenbank ab. Das Feld 'assignedTo' wird mit dem Namen und der Rolle des Benutzers befüllt.
 *     responses:
 *       200:
 *         description: Ein Array von Aufgaben-Objekten.
 *       500:
 *         description: Fehler beim Abrufen der Aufgaben.
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
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Neue Aufgabe erstellen
 *     tags: [Tasks]
 *     description: Erstellt eine neue Aufgabe und weist sie einem Benutzer zu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titel der Aufgabe
 *               description:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *                 description: Benutzer-ID des Zuständigen
 *               pointsReward:
 *                 type: number
 *                 description: Sterne-Belohnung
 *     responses:
 *       201:
 *         description: Das neu erstellte Aufgaben-Objekt.
 *       400:
 *         description: Fehler beim Erstellen der Aufgabe.
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
 * @swagger
 * /api/tasks/{id}/done:
 *   put:
 *     summary: Aufgabe als erledigt markieren
 *     tags: [Tasks]
 *     description: Markiert eine Aufgabe als 'erledigt' und schreibt die Punkte dem Benutzer gut. Verhindert mehrfache Gutschriften für dieselbe Aufgabe.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Die ID der Aufgabe
 *     responses:
 *       200:
 *         description: Aufgabe abgeschlossen und Punkte vergeben.
 *       400:
 *         description: Aufgabe bereits abgeschlossen oder Fehler beim Aktualisieren.
 *       404:
 *         description: Aufgabe nicht gefunden.
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
 * @swagger
 * /api/tasks/user/{id}/points:
 *   get:
 *     summary: Punktestand eines Benutzers abrufen
 *     tags: [Tasks]
 *     description: Ruft den aktuellen Punktestand eines spezifischen Benutzers ab.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Die ID des Benutzers
 *     responses:
 *       200:
 *         description: Der Punktestand des Benutzers.
 *       400:
 *         description: Fehler beim Abrufen des Punktestands.
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
 * @swagger
 * /api/tasks/users:
 *   get:
 *     summary: Alle Benutzer abrufen
 *     tags: [Tasks]
 *     description: Ruft eine Liste aller Benutzer ab, um Helden im Dashboard anzuzeigen.
 *     responses:
 *       200:
 *         description: Eine Liste aller Benutzer.
 *       500:
 *         description: Fehler beim Abrufen der Helden.
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
