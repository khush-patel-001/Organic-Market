import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Certification } from "../models/certification.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCertification = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { certificationName, expiryDate } = req.body;
  const certificateImage = req.file.path;

  if (!productId) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  if (!certificationName || !certificateImage || !expiryDate) {
    throw new ApiError(400, "All fields are required.");
  }

  const certificateImageUpload = await uploadOnCloudinary(certificateImage);

  if (!certificateImageUpload.url) {
    throw new ApiError(400, "Certificate image upload failed.");
  }

  const certification = await Certification.create({
    certificationName,
    product: productId,
    certificateImage: certificateImageUpload?.url,
    expiryDate,
  });

  if (!certification) {
    throw new ApiError(400, "Certification not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { certification },
        "Certification created successfully."
      )
    );
});

const getAllCertifications = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  const certifications = await Certification.find({ product: productId });

  if (!certifications) {
    throw new ApiError(400, "Certifications not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { certifications }, "Certifications found."));
});

const getCertificationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Certification ID not found in request.");
  }

  const certification = await Certification.findById(id);

  if (!certification) {
    throw new ApiError(400, "Certification not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { certification }, "Certification found."));
});

const updateCertification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { certificationName, expiryDate } = req.body;
  const certificateImage = req.file.path;

  if (!id) {
    throw new ApiError(400, "Certification ID not found in request.");
  }

  let certificateImageUpload;
  if (certificateImage) {
    certificateImageUpload = await uploadOnCloudinary(certificateImage);

    if (!certificateImageUpload.url) {
      throw new ApiError(400, "Certificate image upload failed.");
    }
  }

  const certification = await Certification.findByIdAndUpdate(
    id,
    {
      $set: {
        certificationName,
        certificateImage: certificateImageUpload?.url,
        expiryDate,
      },
    },
    { new: true }
  );

  if (!certification) {
    throw new ApiError(400, "Certification not found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        certification,
      },
      "Certification updated successfully."
    )
  );
});

const deleteCertification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Certification ID not found in request.");
  }

  const certification = await Certification.findByIdAndDelete(id);

  if (!certification) {
    throw new ApiError(400, "Certification not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { certification }, "Certification deleted successfully."));
});

export {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
};
