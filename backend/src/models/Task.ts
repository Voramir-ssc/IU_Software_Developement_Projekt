import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface für das Aufgaben-Modell (Task).
 * Repräsentiert eine Aufgabe innerhalb des Familien Hero Systems.
 * 
 * @interface ITask
 * @extends {Document}
 */
export interface ITask extends Document {
  /** Der Titel der Aufgabe */
  title: string;
  /** Eine optionale, detailliertere Beschreibung der Aufgabe */
  description?: string;
  /** Referenz auf die ObjectId des zugewiesenen Benutzers (Helden) */
  assignedTo: mongoose.Types.ObjectId;
  /** Anzahl der Sterne, die bei Abschluss der Aufgabe als Belohnung vergeben werden */
  pointsReward: number;
  /** Der aktuelle Status der Aufgabe ('open' für ausstehend, 'done' für erledigt) */
  status: 'open' | 'done';
}

/**
 * Mongoose Schema-Definition für eine Aufgabe (Task).
 * Speichert Titel, Beschreibung, zuständigen Benutzer, Belohnung und Status.
 */
const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pointsReward: { type: Number, default: 10 },
  status: { type: String, enum: ['open', 'done'], default: 'open' },
});

export default mongoose.model<ITask>('Task', TaskSchema);
