import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//ตรวจสอบ token ใน cookie
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("สวัสดี, คุณได้ล็อกอินเข้ามาแล้ว");
// });

// //ตรวจสอบ username
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("สวัสดี, คุณได้ล็อกอินเข้ามาแล้วและสามารถลบข้อมูลแอคเคาท์นี่ได้");
// });

// //ตรวจสอบระบบ admin
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("สวัสดี, คุณได้ล็อกอินเข้ามาสู่ระบบแอดมินแล้ว");
// });

//create
router.post("/", verifyUser, createUser);

//update
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//get
router.get("/:id", verifyUser, getUser);

//get all
router.get("/", verifyAdmin, getAllUser);

export default router;
