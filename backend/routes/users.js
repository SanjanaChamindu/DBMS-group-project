import express from "express";
import {
  registerEmployee,
  registerUser,
  deleteEmployee
} from "../controllers/users.js";

const router = express.Router();

router.post("/", registerEmployee);
router.post("/employee/:id", registerUser);
router.delete("/deleteEmployee/:id", deleteEmployee);


export default router;
