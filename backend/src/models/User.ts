import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface für das User-Modell.
 * Repräsentiert ein Familienmitglied (Eltern oder Kind).
 */
export interface IUser extends Document {
  name: string;
  role: 'parent' | 'child'; // Rolle für Berechtigungen
  points: number;           // Aktueller Punktestand
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], default: 'parent' },
  points: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
