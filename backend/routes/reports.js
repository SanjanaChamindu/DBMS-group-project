import express from "express";
import {
  getReport,
  getSub,
  subDetails,
  editEmp,
  editLeaves,
  getDepts,
  empByDept,
  getJobs,
  getEmp,
  empById,
  customAttribute
} from "../controllers/reports.js";

const router = express.Router();

router.get("/", getReport);
router.get("/emp/:id", getEmp);
router.get("/subordinates", getSub);
router.get("/subordinates/:id", subDetails);
router.put("/edit/:id", editEmp);
router.put("/editleaves", editLeaves);
router.get("/depts", getDepts);
router.get("/jobs", getJobs);
router.get("/depts/:id", empByDept);
router.get("/empbyid/:id", empById);
router.post("/customattributes", customAttribute);

export default router;
