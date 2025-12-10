import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  const { productName, price, unit, stock, harvestDate, description } =
    req.body;

  if (
    !productName ||
    !price ||
    !unit ||
    !stock ||
    !harvestDate ||
    !description
  ) {
    throw new ApiError(400, "All product details are required.");
  }

  const images = req.files?.images;

  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new ApiError(400, "At least 1 product image is required");
  }

  const imagePaths = [];

  for (let i = 0; i < Math.min(images.length, 4); i++) {
    if (images[i]?.path) {
      try {
        const uploadedImage = await uploadOnCloudinary(images[i].path);

        if (!uploadedImage) {
          throw new ApiError(400, `Product image ${i + 1} upload failed.`);
        }

        imagePaths.push(uploadedImage.url);
      } catch (error) {
        throw new ApiError(
          400,
          `Error uploading image ${i + 1}: ${error.message}`
        );
      }
    }
  }

  if (imagePaths.length === 0) {
    throw new ApiError(400, "Failed to upload any product images.");
  }

  while (imagePaths.length < 4) {
    imagePaths.push("");
  }

  const product = await Product.create({
    farmer: req.farmer?._id,
    productName,
    price,
    unit,
    stock,
    images: imagePaths,
    harvestDate,
    description,
  });

  if (!product) {
    throw new ApiError(500, "Failed to create product.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { product }, "Product successfully created."));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .select("-password")
    .sort({ createdAt: -1 });

  if (!products) {
    throw new ApiError(400, "Products not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { products }, "Products found."));
});

const getAllProductsByFarmerId = asyncHandler(async (req, res) => {
  const { id } = req.farmer;

  if (!id) {
    throw new ApiError(400, "Farmer ID not found in request.");
  }

  const products = await Product.find({ farmer: id })
    .select("-password")
    .sort({ createdAt: -1 });

  if (!products) {
    throw new ApiError(400, "Products not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { products }, "Products found."));
});

const getProductByProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  const product = await Product.findById(id).select("-password");

  if (!product) {
    throw new ApiError(400, "Product not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product found."));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    price,
    unit,
    stock,
    harvestDate,
    description,
    certifications,
  } = req.body;

  if (!id) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  const images = req.files?.images;

  if (!images || !Array.isArray(images) || images.length === 0) {
    throw new ApiError(400, "At least 1 product image is required");
  }

  const imagePaths = [];

  for (let i = 0; i < Math.min(images.length, 4); i++) {
    if (images[i]?.path) {
      try {
        const uploadedImage = await uploadOnCloudinary(images[i].path);

        if (!uploadedImage) {
          throw new ApiError(400, `Product image ${i + 1} upload failed.`);
        }

        imagePaths.push(uploadedImage.url);
      } catch (error) {
        throw new ApiError(
          400,
          `Error uploading image ${i + 1}: ${error.message}`
        );
      }
    }
  }

  if (imagePaths.length === 0) {
    throw new ApiError(400, "Failed to upload any product images.");
  }

  while (imagePaths.length < 4) {
    imagePaths.push("");
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        productName,
        price,
        unit,
        stock,
        images: imagePaths,
        harvestDate,
        description,
        certifications,
      },
    },
    { new: true }
  );

  if (!product) {
    throw new ApiError(400, "Product not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product successfully updated"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID not found in request.");
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(400, "Product not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product Deleted successfully."));
});

export {
  createProduct,
  getAllProducts,
  getAllProductsByFarmerId,
  getProductByProductId,
  updateProduct,
  deleteProduct,
};
