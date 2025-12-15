export default function CryptoGrid({
  coins = [],
  favorites = [],
  showFavorites,
  onToggleFavorite,
  onSelectCoin,
  search = "",
}) {
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const displayedCoins = showFavorites
    ? filteredCoins.filter((c) => favorites.includes(c.id))
    : filteredCoins;

  if (displayedCoins.length === 0) {
    return <p style={{ opacity: 0.6 }}>No coins found</p>;
  }

  return (
    <div className="crypto-grid">
      {displayedCoins.map((coin) => (
        <div
          key={coin.id}
          className="crypto-card"
          onClick={() => onSelectCoin(coin)}
        >
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={coin.image}
                alt={coin.name}
                width="28"
                height="28"
              />
              <div>
                <strong>{coin.name}</strong>
                <div className="symbol">{coin.symbol.toUpperCase()}</div>
              </div>
            </div>

            <button
              className="star"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(coin.id);
              }}
            >
              {favorites.includes(coin.id) ? "⭐" : "☆"}
            </button>
          </div>

          <div className="price">
            ${coin.current_price?.toLocaleString()}
          </div>

          <div
            className={
              coin.price_change_percentage_24h >= 0
                ? "change positive"
                : "change negative"
            }
          >
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
}
