import express from "express";
import { viewCustomFields, viewCustomFieldsEmployees, addCustomFields, deleteCustomFields } from "../controllers/custom.js";

const router = express.Router();

router.get("/customFeilds", viewCustomFields);
router.get("/customFeilds/employees", viewCustomFieldsEmployees);
router.post("/customFeilds/add", addCustomFields);
router.delete("/delete/:id", deleteCustomFields);

export default router;
