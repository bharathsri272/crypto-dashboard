import { useEffect, useState } from "react";
import CryptoGrid from "./CryptoGrid";
import CoinModal from "./CoinModal";
import "./App.css";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const API_BASE = "https://crypto-dashboard-8901.onrender.com";
        const res = await fetch(`${API_BASE}/api/coins`);
        const data = await res.json();
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
        // 🔒 CRITICAL SAFETY CHECK
        if (!Array.isArray(data)) {
          console.error("Invalid coins response:", data);
          setCoins([]); // prevent crash
          return;
        }
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
        setCoins(data);
      } catch (err) {
        console.error("Coin fetch failed:", err);
        setCoins([]); // fail safely
      }
    }
  
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  function handleToggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  return (
    <div className="app-container">
      <div className="app-content">
        <h1>📈 Crypto Dashboard</h1>

        <input
          className="search"
          placeholder="Search crypto (Bitcoin, ETH...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          <button onClick={() => setShowFavorites(false)}>All Coins</button>
          <button onClick={() => setShowFavorites(true)}>⭐ Favorites</button>
        </div>

        <CryptoGrid
          coins={coins}
          favorites={favorites}
          showFavorites={showFavorites}
          search={search}
          onToggleFavorite={handleToggleFavorite}
          onSelectCoin={setSelectedCoin}
        />

        {selectedCoin && (
          <CoinModal
            coin={selectedCoin}
            onClose={() => setSelectedCoin(null)}
          />
        )}
      </div>
    </div>
  );
}
