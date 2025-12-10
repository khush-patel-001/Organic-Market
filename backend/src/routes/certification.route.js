import express from "express";
import {
  createCertification,
  getAllCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
} from "../controllers/certification.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router
  .route("/create-certification/:productId")
  .post(verifyToken, upload.single("certificateImage"), createCertification);
router
  .route("/get-all-certifications/:productId")
  .get(verifyToken, getAllCertifications);
router
  .route("/get-certification-by-id/:id")
  .get(verifyToken, getCertificationById);
router
  .route("/update-certification/:id")
  .put(verifyToken, upload.single("certificateImage"), updateCertification);
router
  .route("/delete-certification/:id")
  .delete(verifyToken, deleteCertification);

export default router;
