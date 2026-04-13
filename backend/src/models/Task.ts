import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface für das Aufgaben-Modell (Task).
 */
export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo: mongoose.Types.ObjectId; // Referenz auf den User (Held)
  pointsReward: number;                 // Belohnung in Sternen
  status: 'open' | 'done';
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pointsReward: { type: Number, default: 10 },
  status: { type: String, enum: ['open', 'done'], default: 'open' },
});

export default mongoose.model<ITask>('Task', TaskSchema);
