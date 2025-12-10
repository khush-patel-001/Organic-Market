import express from "express";
import {
  getCurrentUser,
  updateAccountDetails,
  updateProfileImage,
  updateCoverImage,
  updatePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/current-user").get(verifyToken, getCurrentUser);
router.route("/update-account-details").put(verifyToken, updateAccountDetails);
router
  .route("/update-profile-image")
  .put(verifyToken, upload.single("profileImage"), updateProfileImage);
router
  .route("/update-cover-image")
  .put(verifyToken, upload.single("coverImage"), updateCoverImage);
router.route("/update-password").put(verifyToken, updatePassword);

export default router;
