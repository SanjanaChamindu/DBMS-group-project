import express from "express";
import {
  getReport,
  getSub,
  subDetails,
  editEmp,
  editLeaves,
} from "../controllers/reports.js";

const router = express.Router();

router.get("/", getReport);
router.get("/subordinates", getSub);
router.get("/subordinates/:id", subDetails);
router.put("/edit/:id", editEmp);
router.put("/editleaves", editLeaves);

export default router;
