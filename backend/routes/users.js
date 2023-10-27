import express from "express";
import {
  register, allEmp
} from "../controllers/users.js";

const router = express.Router();

router.get("/", register);
router.get("/allemp", allEmp);

export default router;
