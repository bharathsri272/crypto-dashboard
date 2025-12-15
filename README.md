# 📈 Crypto Dashboard

A full‑stack cryptocurrency dashboard built with **React + Node.js (Express)** that displays live crypto prices, favorites, and interactive price charts — with caching and graceful fallback to handle API rate limits.

---

## 🚀 Live Demo

**Frontend (Vercel):**  
👉 https://crypto-dashboard-iota-five.vercel.app

**Backend API (Render):**  
👉 https://crypto-dashboard-8901.onrender.com

---

## ✨ Features

- 🔍 Search cryptocurrencies by name or symbol  
- ⭐ Favorite coins (stored locally)  
- 📊 Interactive price charts with time‑range selector (1D / 7D / 30D)  
- 🔄 Auto‑refreshing prices  
- 🧠 Backend caching to reduce API calls  
- 🛡 Graceful fallback when CoinGecko rate limits are hit  
- 🌐 Fully deployed frontend + backend  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- CSS Grid & Flexbox
- SVG‑based charts
- Deployed on **Vercel**

### Backend
- Node.js
- Express
- CoinGecko API
- In‑memory caching
- Deployed on **Render**

---

## 📁 Project Structure

```
crypto-dashboard/
├── client/          # React frontend
│   └── src/
├── server/          # Express backend
│   └── index.js
└── README.md
```

---

## 🧠 API Rate Limits

CoinGecko enforces strict rate limits.  
This project handles them by:
- Caching responses server‑side
- Returning fallback demo data if needed
- Preventing blank screens or crashes

---

## 🛠 Local Setup

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 📌 Future Improvements
- MongoDB persistence for favorites
- User authentication
- Alternative data providers

---

## 👤 Author

Built by **Bharath Sri**

⭐ Star the repo if you found this useful!
