import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.jwt;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?.userId).select("-password");

    const farmer = await Farmer.findById(decodedToken?.userId).select("-password");

    if (!user && !farmer) {
      throw new ApiError(401, "user not Found");
    }

    if (!user && farmer) {
      req.farmer = farmer;
      next();
      return;
    }

    if (user) {
      req.user = user;
      next();
      return;
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});