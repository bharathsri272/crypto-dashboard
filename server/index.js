import express from "express";
import cors from "cors";
const chartCache = {};
const CHART_TTL = 5 * 60 * 1000;
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;

// In-memory cache
const cache = {};
const TTL = 5 * 60 * 1000; // 5 minutes

async function cachedFetch(key, url) {
  const now = Date.now();

  if (cache[key] && now - cache[key].time < TTL) {
    return cache[key].data;
  }

  const res = await fetch(url);
  const data = await res.json();

  cache[key] = { data, time: now };
  return data;
}

// Test route
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

let cachedCoins = null;
let lastFetch = 0;

// Coins list

app.get("/api/coins", async (req, res) => {
  const now = Date.now();

  // Cache for 60 seconds
  if (cachedCoins && now - lastFetch < 60_000) {
    return res.json(cachedCoins);
  }

  try {
    const response = await fetch(COINGECKO_URL);
    const data = await response.json();

    cachedCoins = data;
    lastFetch = now;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coins" });
  }
});

// Chart data (ALWAYS returns something)
app.get("/api/chart/:coinId/:days", async (req, res) => {
  const { coinId, days } = req.params;
  const cacheKey = `${coinId}_${days}`;
  const now = Date.now();

  // Serve cached data if fresh
  if (
    chartCache[cacheKey] &&
    now - chartCache[cacheKey].timestamp < CHART_TTL
  ) {
    return res.json(chartCache[cacheKey].data);
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

    const response = await fetch(url);
    const data = await response.json();

    // Save to cache
    chartCache[cacheKey] = {
      data,
      timestamp: now,
    };

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
});
