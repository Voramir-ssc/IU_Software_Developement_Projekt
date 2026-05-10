import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface für das Belohnungs-Modell (Reward).
 * Repräsentiert eine Belohnung, die gegen gesammelte Sterne eingelöst werden kann.
 * 
 * @interface IReward
 * @extends {Document}
 */
export interface IReward extends Document {
  /** Der Titel der Belohnung (z.B. "Kinobesuch") */
  title: string;
  /** Optionale Beschreibung der Belohnung */
  description?: string;
  /** Die Kosten der Belohnung in Sternen (Punkten) */
  cost: number;
  /** Ein optionales Emoji oder Icon zur visuellen Darstellung */
  icon?: string;
}

/**
 * Mongoose Schema-Definition für eine Belohnung.
 * Speichert Titel, Beschreibung, Punktekosten und das Icon.
 */
const RewardSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true },
  icon: { type: String, default: '🎁' },
});

export default mongoose.model<IReward>('Reward', RewardSchema);
