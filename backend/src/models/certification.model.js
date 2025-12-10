import mongoose, { Schema } from "mongoose";

const certificationSchema = new Schema(
  {
    certificationName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    certificateImage: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Certification = mongoose.model("Certification", certificationSchema);
