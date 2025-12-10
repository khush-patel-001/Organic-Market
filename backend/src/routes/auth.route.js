import express from "express";
import { 
  register,
  login, 
  logout,
  checkAuth
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
router.route("/check-auth").get(verifyToken, checkAuth);

export default router;
