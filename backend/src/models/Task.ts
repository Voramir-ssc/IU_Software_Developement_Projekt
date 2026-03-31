import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface fuer das Aufgaben-Modell (Task).
 * Definiert die Struktur einer Haushaltsaufgabe in der Datenbank.
 */
export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo: mongoose.Types.ObjectId;
  pointsReward: number;
  status: 'open' | 'done';
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true }, // Titel der Aufgabe
  description: { type: String }, // Optionale detaillierte Beschreibung
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referenz auf den ausfuehrenden Benutzer
  pointsReward: { type: Number, default: 10 }, // Punktebelohnung bei Abschluss
  status: { type: String, enum: ['open', 'done'], default: 'open' }, // Aktueller Status (offen oder erledigt)
});

export default mongoose.model<ITask>('Task', TaskSchema);
