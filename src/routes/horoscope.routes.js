import { Router } from "express";
import { scrapeHoroscope } from "../controllers/horoscope.controller.js";

const router = Router();

// router.get("/", scrapeHoroscope);
router.get("/", (req, res) => {
  res.send("Hello world!!");
});

export default router;
