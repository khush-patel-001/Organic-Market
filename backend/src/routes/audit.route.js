import express from "express";
import {
  createAudit,
  getAuditById,
  getAuditByProductId,
  updateAudit,
  deleteAudit,
} from "../controllers/audit.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/create-audit/:id").post(verifyToken, createAudit);
router.route("/get-audit-by-id/:id").get(verifyToken, getAuditById);
router.route("/get-audit-by-product-id/:id").get(verifyToken, getAuditByProductId);
router.route("/update-audit/:id").put(verifyToken, updateAudit);
router.route("/delete-audit/:id").delete(verifyToken, deleteAudit);

export default router;
