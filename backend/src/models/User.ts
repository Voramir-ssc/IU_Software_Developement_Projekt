import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: 'parent' | 'child';
  points: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], default: 'parent' },
  points: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
