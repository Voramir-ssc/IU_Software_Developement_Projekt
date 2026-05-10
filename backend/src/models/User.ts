import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface für das User-Modell.
 * Repräsentiert ein Familienmitglied (Eltern oder Kind).
 * 
 * @interface IUser
 * @extends {Document}
 */
export interface IUser extends Document {
  /** Der Name des Familienmitglieds */
  name: string;
  /** Die Rolle des Benutzers (bestimmt Berechtigungen, z.B. Aufgaben erstellen) */
  role: 'parent' | 'child';
  /** Der aktuelle Punktestand (Sterne) des Benutzers */
  points: number;
}

/**
 * Mongoose Schema-Definition für einen Benutzer.
 * Speichert Name, Rolle und den aktuellen Punktestand.
 */
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], default: 'parent' },
  points: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
