import express from "express";
import {
  getAllFarmers,
  getFarmerById,
  updateFarmerAccountDetails,
  updateFarmerProfileImage,
  updateFarmerCoverImage,
  updateFarmerPassword,
} from "../controllers/farmer.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/get-all-farmers").get(verifyToken, getAllFarmers);
router.route("/get-farmer-by-id/:id").get(verifyToken, getFarmerById);
router
  .route("/update-farmer-account-details")
  .put(verifyToken, updateFarmerAccountDetails);
router
  .route("/update-farmer-profile-image")
  .put(verifyToken, upload.single("profileImage"), updateFarmerProfileImage);
router
  .route("/update-farmer-cover-image")
  .put(verifyToken, upload.single("coverImage"), updateFarmerCoverImage);
router.route("/update-farmer-password").put(verifyToken, updateFarmerPassword);

export default router;
