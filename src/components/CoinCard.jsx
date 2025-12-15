export default function CoinCard({ coin }) {
  const changePositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="coin-card">
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} />
        <h3>{coin.name}</h3>
        <span className="symbol">{coin.symbol.toUpperCase()}</span>
      </div>

      <p className="price">${coin.current_price.toLocaleString()}</p>

      <p className={changePositive ? "positive" : "negative"}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
}
