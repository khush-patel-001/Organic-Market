import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const farmerSchema = new Schema(
  {
    isFarmer: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      default: "+91 1234567890",
    },
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    farmName: {
      type: String,
      required: true,
      minlength: 3,
      lowercase: true,
    },
    farmAddress: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      lowercase: true,
    },
    farmDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      default: "",
      lowercase: true,
    },
    farmSize: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: String,
      default: "",
    },
    certifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Certification",
        default: [],
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const Farmer = mongoose.model("Farmer", farmerSchema);
