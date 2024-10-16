import mongoose from "mongoose";
import VerificationCodeType from "../constants/verificationType";

export interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes" // overrides the default collection name
);

export default VerificationCodeModel;
