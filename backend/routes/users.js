import express from "express";
import {
  registerEmployee,
  registerUser
} from "../controllers/users.js";

const router = express.Router();

router.post("/", registerEmployee);
router.post("/employee/:id", registerUser);


export default router;
