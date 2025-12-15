import "./CryptoCard.css";

export default function CryptoCard({
  coin,
  isFavorite,
  onToggleFavorite,
  onClick,
}) {
  const change = coin.price_change_percentage_24h;

  return (
    <div className="crypto-card" onClick={onClick}>
      <div className="card-header">
        <img src={coin.image} alt={coin.name} />
        <div>
          <strong>{coin.name}</strong>
          <span className="symbol">{coin.symbol.toUpperCase()}</span>
        </div>

        {/* ⭐ Favorite button */}
        <button
          className="star"
          onClick={(e) => {
            e.stopPropagation(); // IMPORTANT
            onToggleFavorite();
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <h2>${coin.current_price.toLocaleString()}</h2>

      <p className={change >= 0 ? "green" : "red"}>
        {change.toFixed(2)}%
      </p>
    </div>
  );
}
