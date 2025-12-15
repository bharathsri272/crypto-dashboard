export default function CryptoModal({ coin, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{coin.name}</h2>
        <p>Symbol: {coin.symbol.toUpperCase()}</p>
        <p>Price: ${coin.current_price.toLocaleString()}</p>
        <p>
          24h Change:{" "}
          {coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
