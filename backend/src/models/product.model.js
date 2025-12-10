import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    price: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    stock: {
      type: String,
      required: true,
    },
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    harvestDate: {
      type: String,
      required: true,
    },
    certifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Certification",
        default: [],
      },
    ],
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
