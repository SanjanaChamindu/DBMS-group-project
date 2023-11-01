import express from "express";
import { viewCustomFields,deleteCustomFields, viewCustomFieldsEmployees, addCustomFields } from "../controllers/custom.js";

const router = express.Router();

router.get("/customFeilds", viewCustomFields);
router.get("/customFeilds/employees", viewCustomFieldsEmployees);
router.post("/customfield/add", addCustomFields);
router.delete("/customfield/delete/:id", deleteCustomFields);

export default router;
