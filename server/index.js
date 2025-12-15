import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;

/* ===============================
   CONSTANTS
================================ */
const COINGECKO_COINS_URL =
  "https://api.coingecko.com/api/v3/coins/markets" +
  "?vs_currency=usd&order=market_cap_desc&per_page=20&page=1" +
  "&sparkline=false&price_change_percentage=24h";

/* ===============================
   CACHES
================================ */
let coinsCache = null;
let coinsLastFetch = 0;
const COINS_TTL = 60_000; // 1 minute

const chartCache = {};
const CHART_TTL = 5 * 60 * 1000; // 5 minutes

/* ===============================
   ROUTES
================================ */

// Health check
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

// Coins list (CACHED)
app.get("/api/coins", async (req, res) => {
  const now = Date.now();

  if (coinsCache && now - coinsLastFetch < COINS_TTL) {
    return res.json(coinsCache);
  }

  try {
    const response = await fetch(COINGECKO_COINS_URL);
    const data = await response.json();

    coinsCache = data;
    coinsLastFetch = now;

    res.json(data);
  } catch (err) {
    console.error("Coin fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch coins" });
  }
});

// Chart data (CACHED PER COIN + RANGE)
app.get("/api/chart/:coinId/:days", async (req, res) => {
  const { coinId, days } = req.params;
  const key = `${coinId}_${days}`;
  const now = Date.now();

  if (chartCache[key] && now - chartCache[key].time < CHART_TTL) {
    return res.json(chartCache[key].data);
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
    const response = await fetch(url);
    const data = await response.json();

    chartCache[key] = { data, time: now };
    res.json(data);
  } catch (err) {
    console.error("Chart fetch failed:", err);
    res.status(500).json({ error: "Chart unavailable" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
