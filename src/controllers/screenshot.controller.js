import puppeteer from "puppeteer";
import FormData from "form-data";
import axios from "axios";

export const takeScreenshot = async (req, res) => {
  const { v_height, v_width, height, width, deviceScaleFactor, x, y, url } =
    req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-gpu"],
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.setViewport({
      height: v_height,
      width: v_width,
      deviceScaleFactor,
    });
    const screenshot = await page.screenshot({
      type: "png",
      clip: { x, y, height, width },
      encoding: "base64",
    });
    const base64 = screenshot.toString("base64");

    const data = new FormData();
    data.append("image", base64);
    const config = {
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${process.env.API_KEY}`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(config);
    res.send(response.data);
    await browser.close();
  } catch (error) {
    res.send(`Error ${JSON.stringify(error)}`);
  }
};
