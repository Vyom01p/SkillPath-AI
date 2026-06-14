import express from "express";
import {
  signup,
  login,
  getMe,
  updateMe,
  changePassword,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", protect, getMe);
router.patch("/updateMe", protect, updateMe);
router.patch("/changePassword", protect, changePassword);

export default router;
