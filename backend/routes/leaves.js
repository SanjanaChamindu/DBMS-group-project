import express, { request } from "express";
import { requestLeave, viewMyRequests, viewSubRequests, approveLeave, rejectLeave } from "../controllers/leaves.js";

const router = express.Router();

router.post("/request", requestLeave);
router.get("/requests/myrequests", viewMyRequests);
router.get("/requests/subordinates", viewSubRequests);
router.get("/requests/subordinatesApprove/:id", approveLeave);
router.get("/requests/subordinatesreject/:id", rejectLeave);

export default router;