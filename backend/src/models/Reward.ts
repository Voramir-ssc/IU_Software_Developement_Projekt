import mongoose, { Schema, Document } from 'mongoose';

export interface IReward extends Document {
  title: string;
  description?: string;
  cost: number;
  icon?: string;
}

const RewardSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true },
  icon: { type: String, default: '🎁' },
});

export default mongoose.model<IReward>('Reward', RewardSchema);
