import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

export { app };
