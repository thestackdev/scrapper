import { Router } from "express";
import { takeScreenshot } from "../controllers/screenshot.controller.js";

const router = Router();

router.post("/", takeScreenshot);

export default router;
