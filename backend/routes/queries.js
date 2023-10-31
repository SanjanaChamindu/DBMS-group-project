import express from "express";
import { departmentQuery,getEmpReport, leavesByDateRange, departmentLeaves, manyAttributes, customAttribute, returnDistinctValues, returnCustomAttribute } from "../controllers/queries.js";

const router = express.Router();

router.post("/department", departmentQuery);
router.post("/departmentLeaves", departmentLeaves)
router.post("/manyAttributes", manyAttributes)
router.post("/customAttribute", customAttribute)

router.get("/attribvals/:attribute_name", returnDistinctValues)
router.get("/attribs", returnCustomAttribute)
router.post("/leaves", leavesByDateRange)
router.post("/empreport", getEmpReport);

export default router;