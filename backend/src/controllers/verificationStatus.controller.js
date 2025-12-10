import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { VerificationStatus } from "../models/verificationStatus.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createVerificationStatus = asyncHandler(async (req, res) => {
  const { id } = req.farmer;

  if (!id) {
    throw new ApiError(400, "Farmer ID not found in request.");
  }

  const verificationStatus = await VerificationStatus.create({
    farmer: id,
  });

  if (!verificationStatus) {
    throw new ApiError(400, "Verification Status not found.");
  }

  return res.status(200).json(
    new ApiResponse(200, "Verification Status created successfully.", {
      verificationStatus,
    })
  );
});

const getVerificationStatusById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Verification Status ID not found in request.");
  }

  const verificationStatus = await VerificationStatus.findById(id);

  if (!verificationStatus) {
    throw new ApiError(400, "Verification Status not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Verification Status found.", { verificationStatus })
    );
});

const updateVerificationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, expiryDate } = req.body;

  if (!id) {
    throw new ApiError(400, "Verification Status ID not found in request.");
  }

  if (!status) {
    throw new ApiError(400, "Status is required.");
  }

  const verificationStatus = await VerificationStatus.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
        expiryDate,
      },
    },
    { new: true }
  );

  if (!verificationStatus) {
    throw new ApiError(400, "Verification Status not found.");
  }

  return res.status(200).json(
    new ApiResponse(200, "Verification Status updated successfully.", {
      verificationStatus,
    })
  );
});

const deleteVerificationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "VerificationStatus ID not found in request.");
  }

  const verificationStatus = await VerificationStatus.findByIdAndDelete(id);

  if (!verificationStatus) {
    throw new ApiError(400, "VerificationStatus not found.");
  }

  return res.status(200).json(
    new ApiResponse(200, "verificationStatus deleted successfully.", {
      verificationStatus,
    })
  );
});

export {
  createVerificationStatus,
  getVerificationStatusById,
  updateVerificationStatus,
  deleteVerificationStatus,
};
