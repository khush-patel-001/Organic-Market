import express from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsByFarmerId,
  getProductByProductId,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/create-product").post(
  verifyToken,
  upload.fields([
    {
      name: "images",
      maxCount: 4,
    },
  ]),
  createProduct
);
router.route("/get-all-products").get(getAllProducts);
router.route("/get-all-products-by-farmerId").get(verifyToken, getAllProductsByFarmerId);
router.route("/get-product-by-productId/:id").get(verifyToken, getProductByProductId);
router.route("/update-product/:id").put(
  verifyToken,
  upload.fields([
    {
      name: "images",
      maxCount: 4,
    },
  ]),
  updateProduct
);
router.route("/delete-product/:id").delete(verifyToken, deleteProduct);

export default router;
