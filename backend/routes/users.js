import express from "express";
import {
   allEmp, registerUser, registerEmployee, registerEmployee2, deleteEmployee
} from "../controllers/users.js";

const router = express.Router();

// router.get("/", register);
router.get("/allemp", allEmp);
router.post("/employee/:id", registerUser);
router.post("/regemp", registerEmployee);
router.post("/registeremp", registerEmployee2);
router.delete("/deleteemp/:id", deleteEmployee);

export default router;
