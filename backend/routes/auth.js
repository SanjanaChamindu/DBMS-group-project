import express from "express";
import { login, logout, register, changePassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/changepassword", changePassword);

export default router;
