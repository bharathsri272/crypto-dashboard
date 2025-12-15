import express from "express";
import cors from "cors";

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

// Coins list
app.get("/api/coins", async (req, res) => {
  try {
    const data = await cachedFetch(
      "coins",
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h"
    );
    res.json(data);
  } catch {
    res.json([]);
  }
});

// Chart data (ALWAYS returns something)
app.get("/api/chart/:id/:days", async (req, res) => {
  const { id, days } = req.params;
  const key = `${id}-${days}`;

  try {
    const data = await cachedFetch(
      key,
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    res.json({ prices: data.prices || [] });
  } catch {
    res.json({ prices: cache[key]?.data?.prices || [] });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
