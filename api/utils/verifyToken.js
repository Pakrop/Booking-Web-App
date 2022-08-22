import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // สร้างตัวแปร token เพื่อเก็บ cookie
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "คุณไม่ผ่านการ Verify"));
  }

  // verify token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token ไม่ถูกต้อง"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "คุณยังไม่ผ่านการตรวจสอบ"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "คุณไม่ผ่านการตรวจสอบในการเข้าสู่ระบบแอดมิน"));
      }
    });
  };
  
