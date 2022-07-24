import "dotenv/config";
import express from "express";
import cors from "cors";
import screenshotRouter from "./routes/screenshot.routes.js";
import horoscopeRouter from "./routes/horoscope.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/screenshot", screenshotRouter);
app.use("/horoscope", horoscopeRouter);
app.get("/test", (req, res) => {
  res.send("Hello world");
});

app.listen(8000);
