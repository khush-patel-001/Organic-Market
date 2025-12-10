import express from "express";
import {
  createVerificationStatus,
  getVerificationStatusById,
  updateVerificationStatus,
  deleteVerificationStatus,
} from "../controllers/verificationStatus.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/create-verification-status")
  .post(verifyToken, createVerificationStatus);
router
  .route("/get-verification-status-by-id/:id")
  .get(verifyToken, getVerificationStatusById);
router
  .route("/update-verification-status/:id")
  .put(verifyToken, updateVerificationStatus);
router
  .route("/delete-verification-status/:id")
  .delete(verifyToken, deleteVerificationStatus);

export default router;
