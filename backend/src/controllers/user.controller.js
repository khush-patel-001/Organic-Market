import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { compare } from "bcryptjs";

const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized! user not found"));
  }

  const { id } = req.user;

  if (!id) {
    throw new ApiError(400, "User ID not found in request.");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new ApiError(400, "User not found.");
  }

  return res.status(200).json(new ApiResponse(200, { user }, "User found."));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized! user not found"));
  }

  const { id } = req.user;
  const { name, email, phoneNo } = req.body;

  if (!id) {
    throw new ApiError(400, "User ID not found in request.");
  }

  await User.findOne({ email }).then((user) => {
    if (user && user._id.toString() !== id) {
      throw new ApiError(400, "Email already exists.");
    }
  });

  await Farmer.findOne({ email }).then((user) => {
    if (user && user._id.toString() !== id) {
      throw new ApiError(400, "Email already exists.");
    }
  });

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        email: email,
        phoneNo: phoneNo,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user }, "Account details updated successfully")
    );
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const profileImage  = req.file.path;

  if (!profileImage) {
    throw new ApiError(400, "Profile image not found.");
  }

  const profileImagePath = await uploadOnCloudinary(profileImage);

  if (!profileImagePath.url) {
    throw new ApiError(400, "Profile image upload failed.");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profileImage: profileImagePath?.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user }, "Profile image updated successfully")
    );
});

const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImage  = req.file.path;

  if (!coverImage) {
    throw new ApiError(400, "Cover image not found.");
  }

  const coverImagePath = await uploadOnCloudinary(coverImage);

  if (!coverImagePath.url) {
    throw new ApiError(400, "Cover image upload failed.");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImagePath?.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Cover image updated successfully"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required.");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "User not found.");
  }

  await compare(currentPassword, user.password).then(
    (isMatch) => {
      if (!isMatch) {
        throw new ApiError(400, "Current password is incorrect.");
      }
    }
  );

  user.password = newPassword;
  await user.save();

  const safeUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: safeUser },
        "Password updated successfully"
      )
    );
});

export {
  getCurrentUser,
  updateAccountDetails,
  updateProfileImage,
  updateCoverImage,
  updatePassword,
};
