import CoinCard from "./CoinCard";

export default function CoinList({ coins, query }) {
  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="coin-grid">
      {filtered.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
