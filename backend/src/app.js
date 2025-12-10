import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("public/uploads"));

//routes import
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import farmerRoute from "./routes/farmer.route.js";
import productRoute from "./routes/product.route.js";
import auditRoute from "./routes/audit.route.js";
import verificationStatusRoute from "./routes/verificationStatus.route.js";
import certificationRoute from "./routes/certification.route.js";

//routes declaration
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/farmer", farmerRoute);
app.use("/api/product", productRoute);
app.use("/api/audit", auditRoute);
app.use("/api/verificationStatus", verificationStatusRoute);
app.use("/api/certification", certificationRoute);

//API :- http://localhost:3000/api/auth/register

// centralized error handler to keep responses consistent
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, errors: err.errors || [] });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

export { app };
