import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface für das Belohnungs-Modell (Reward).
 */
export interface IReward extends Document {
  title: string;
  description?: string;
  cost: number;        // Kosten in Sternen
  icon?: string;       // Emoji-Icon für die Anzeige
}

const RewardSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true },
  icon: { type: String, default: '🎁' },
});

export default mongoose.model<IReward>('Reward', RewardSchema);
