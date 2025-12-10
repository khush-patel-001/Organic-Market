import mongoose, { Schema } from "mongoose";

const verificationStatusSchema = new Schema(
  {
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    expiryDate: {
      type: String,
      default: "verification status is pending",
    },
  },
  {
    timestamps: true,
  }
);

export const VerificationStatus = mongoose.model(
  "VerificationStatus",
  verificationStatusSchema
);
