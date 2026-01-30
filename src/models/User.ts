import mongoose, { Schema } from 'mongoose';
import type { AuthRole } from '@/lib/auth';

export type UserDoc = {
  _id: mongoose.Types.ObjectId;
  email: string;
  name?: string;
  passwordHash: string;
  role: AuthRole;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: false, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true, default: 'user' },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel = mongoose.models.User || mongoose.model<UserDoc>('User', UserSchema);

