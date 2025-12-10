import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { compare } from "bcryptjs";

const getAllFarmers = asyncHandler(async (req, res) => {
  const farmers = await Farmer.find({})
    .select("-password")
    .sort({ createdAt: -1 });

  if (!farmers) {
    throw new ApiError(400, "Farmers not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { farmers }, "Farmers found."));
});

const getFarmerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Farmer ID not found in request.");
  }

  const farmer = await Farmer.findById(id).select("-password");

  if (!farmer) {
    throw new ApiError(400, "Farmer not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { farmer }, "Farmer found."));
});

const getCurrentFarmer = asyncHandler(async (req, res) => {
  if (!req.farmer?._id) {
    throw new ApiError(401, "Unauthorized! farmer not found");
  }

  const farmer = await Farmer.findById(req.farmer._id).select("-password");

  if (!farmer) {
    throw new ApiError(400, "Farmer not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { farmer }, "Farmer found."));
});

const updateFarmerAccountDetails = asyncHandler(async (req, res) => {
  if (!req.farmer) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized! user not found"));
  }

  const { id } = req.farmer;
  const {
    name,
    email,
    phoneNo,
    farmName,
    farmAddress,
    farmSize,
    farmDescription,
    establishedYear,
  } = req.body;

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

  const user = await Farmer.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name,
        email: email,
        phoneNo: phoneNo,
        farmName: farmName,
        farmAddress: farmAddress,
        farmSize: farmSize,
        farmDescription: farmDescription,
        establishedYear: establishedYear,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { farmer: user }, "Account details updated successfully")
    );
});

const updateFarmerProfileImage = asyncHandler(async (req, res) => {
  const profileImage  = req.file.path;

  if (!profileImage) {
    throw new ApiError(400, "Profile image not found.");
  }

  const profileImagePath = await uploadOnCloudinary(profileImage);

  if (!profileImagePath.url) {
    throw new ApiError(400, "Profile image upload failed.");
  }

  const farmer = await Farmer.findByIdAndUpdate(
    req.farmer?._id,
    {
      $set: {
        profileImage: profileImagePath?.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, { farmer }, "Avatar image updated successfully"));
});

const updateFarmerCoverImage = asyncHandler(async (req, res) => {
  const coverImage  = req.file.path;

  if (!coverImage) {
    throw new ApiError(400, "Cover image not found.");
  }

  const coverImagePath = await uploadOnCloudinary(coverImage);

  if (!coverImagePath.url) {
    throw new ApiError(400, "Cover image upload failed.");
  }

  const farmer = await Farmer.findByIdAndUpdate(
    req.farmer?._id,
    {
      $set: {
        coverImage: coverImagePath?.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, { farmer }, "Cover image updated successfully"));
});

const updateFarmerPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required.");
  }

  const farmer = await Farmer.findById(req.farmer?._id);

  if (!farmer) {
    throw new ApiError(400, "User not found.");
  }

  const isMatch = await compare(currentPassword, farmer.password).then(
    (isMatch) => {
      if (!isMatch) {
        throw new ApiError(400, "Current password is incorrect.");
      }
    }
  );

  farmer.password = newPassword;
  await farmer.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { farmer }, "Password updated successfully"));
});

export {
  getAllFarmers,
  getFarmerById,
  getCurrentFarmer,
  updateFarmerAccountDetails,
  updateFarmerProfileImage,
  updateFarmerCoverImage,
  updateFarmerPassword,
};
