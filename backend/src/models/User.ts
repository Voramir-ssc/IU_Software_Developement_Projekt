import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface fuer das Benutzer-Modell (User).
 * Repraesentiert Familienmitglieder und deren Punktestand.
 */
export interface IUser extends Document {
  name: string;
  role: 'parent' | 'child';
  points: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true }, // Name des Benutzers
  role: { type: String, enum: ['parent', 'child'], default: 'parent' }, // Rolle (Eltern oder Kind)
  points: { type: Number, default: 0 }, // Akkumulierte Belohnungspunkte
});

export default mongoose.model<IUser>('User', UserSchema);
