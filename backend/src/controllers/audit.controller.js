import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Audit } from "../models/audit.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAudit = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  const audit = await Audit.create({
    product: id,
  });

  if (!audit) {
    throw new ApiError(400, "Audit not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Audit created successfully.", { audit }));
});

const getAuditById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Audit ID not found in request.");
  }

  const audit = await Audit.findById(id);

  if (!audit) {
    throw new ApiError(400, "Audit not found.");
  }

  return res.status(200).json(new ApiResponse(200, "Audit found.", { audit }));
});

const getAuditByProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  const audit = await Audit.find({ product: id });

  if (!audit) {
    throw new ApiError(400, "Audit not found.");
  }

  return res.status(200).json(new ApiResponse(200, "Audit found.", { audit }));
});

const updateAudit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentStatus, reason } = req.body;

  if (!id) {
    throw new ApiError(400, "Audit ID not found in request.");
  }

  if (!currentStatus || !reason) {
    throw new ApiError(400, "All fields are required.");
  }

  const audit = await Audit.findByIdAndUpdate(
    id,
    {
      $set: {
        currentStatus,
        reason,
      },
    },
    { new: true }
  );

  if (!audit) {
    throw new ApiError(400, "Audit not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Audit updated successfully.", { audit }));
});

const deleteAudit = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Audit ID not found in request.");
  }

  const audit = await Audit.findByIdAndDelete(id);

  if (!audit) {
    throw new ApiError(400, "Audit not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Audit deleted successfully.", { audit }));
});

export {
  createAudit,
  getAuditById,
  getAuditByProductId,
  updateAudit,
  deleteAudit,
};
