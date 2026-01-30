import mongoose, { Schema } from 'mongoose';

export type VerificationPurpose = 'email_verification' | 'password_reset';

export type VerificationCodeDoc = {
  _id: mongoose.Types.ObjectId;
  email: string;
  code: string;
  purpose: VerificationPurpose;
  expiresAt: Date;
  createdAt: Date;
};

const VerificationCodeSchema = new Schema<VerificationCodeDoc>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    code: { type: String, required: true },
    purpose: { type: String, enum: ['email_verification', 'password_reset'], required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Index for quick lookup and TTL cleanup
VerificationCodeSchema.index({ email: 1, purpose: 1 });
VerificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const VerificationCodeModel =
  mongoose.models.VerificationCode ||
  mongoose.model<VerificationCodeDoc>('VerificationCode', VerificationCodeSchema);
