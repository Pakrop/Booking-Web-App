import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomRoute from "./routes/rooms.js";
import hotelRoute from "./routes/hotels.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

//เชื่อมต่อกับ MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

//เช็คการเชื่อมต่อกับ mongoDB cloud
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected..");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected..");
});

//middleware

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);

//ตรวจสอบความผิดพลาด
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "มีบางอย่างผิดพลาด";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connect to Back-end....");
});
