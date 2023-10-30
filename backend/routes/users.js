import express from "express";
import {
  register, allEmp, registerUser, registerEmployee
} from "../controllers/users.js";

const router = express.Router();

router.get("/", register);
router.get("/allemp", allEmp);
router.post("/employee/:id", registerUser);
router.post("/", registerEmployee);

export default router;
