import express from "express";
import { departmentQuery, departmentLeaves, manyAttributes, customAttribute, returnDistinctValues, returnCustomAttribute } from "../controllers/queries.js";

const router = express.Router();

router.post("/department", departmentQuery);
router.post("/departmentLeaves", departmentLeaves)
router.post("/manyAttributes", manyAttributes)
router.post("/customAttribute", customAttribute)

router.get("/returnDistinctValues", returnDistinctValues)
router.get("/returnCustomAttribute", returnCustomAttribute)

export default router;