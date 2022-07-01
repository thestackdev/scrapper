import { Router } from "express";
import { scrapeHoroscope } from "../controllers/horoscope.controller.js";

const router = Router();

router.get("/", scrapeHoroscope);

export default router;
