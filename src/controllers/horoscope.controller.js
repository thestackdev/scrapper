import puppeteer from "puppeteer";
import axios from "axios";

const ZODIAC_SIGNS = {
  Aries: 1,
  Taurus: 2,
  Gemini: 3,
  Cancer: 4,
  Leo: 5,
  Virgo: 6,
  Libra: 7,
  Scorpio: 8,
  Sagittarius: 9,
  Capricorn: 10,
  Aquarius: 11,
  Pisces: 12,
};

export const scrapeHoroscope = async (req, res) => {
  const { sign } = req.query;
  const parse_sign = ZODIAC_SIGNS[sign];
  if (parse_sign === undefined || parse_sign === null) {
    res.send("Invalid zodiac sign");
    return;
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-gpu"],
    });
    const page = await browser.newPage();

    await page.goto(
      `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=${parse_sign}`,
      { waitUntil: "networkidle2" }
    );

    const response = await page.evaluate(() => {
      const description = document.querySelector(
        "body > div.grid.grid-right-sidebar.primis-rr > main > div.main-horoscope > p:nth-child(2)"
      ).innerHTML;
      return description.substring(
        description.indexOf("-") + 2,
        description.length
      );
    });

    const extrakeys = await axios.post(
      `https://aztro.sameerkumar.website/?sign=${sign.toLowerCase()}&day=today`
    );

    await browser.close();
    res.send({
      ...extrakeys.data,
      description: `${response}`,
    });
  } catch (error) {
    res.send(`Error ${error}`);
  }
};
