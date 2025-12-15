import { useEffect, useRef, useState } from "react";

export default function CoinModal({ coin, onClose }) {
  const [range, setRange] = useState(1);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const cache = useRef({});

  useEffect(() => {
    if (!coin?.id) return;

    const key = `${coin.id}-${range}`;

    async function fetchChart() {
      if (cache.current[key]) {
        setPrices(cache.current[key]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:5050/api/chart/${coin.id}/${range}`
        );
        const data = await res.json();

        cache.current[key] = data.prices || [];
        setPrices(data.prices || []);
      } finally {
        setLoading(false);
      }
    }

    fetchChart();
  }, [coin.id, range]);

  // Demo fallback if API is limited
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  const seed = hashCode(coin.id);
  const demoPrices = Array.from({ length: 30 }, (_, i) => [
    Date.now() - i * 3600000,
    80 +
      (seed % 50) +
      Math.sin(i / 3 + seed) * (5 + (seed % 10)),
  ]);

  const displayPrices = prices.length ? prices : demoPrices;

  const width = 360;
  const height = 220;
  const padding = 40;

  const values = displayPrices.map((p) => p[1]);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{coin.name}</h2>

        <div className="range-buttons">
          {[1, 7, 30].map((d) => (
            <button
              key={d}
              className={range === d ? "active" : ""}
              onClick={() => setRange(d)}
            >
              {d}D
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ opacity: 0.6 }}>Loading chart…</p>
        ) : (
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* Axes */}
            <line x1={padding} y1={10} x2={padding} y2={height - padding} stroke="#aaa" />
            <line
              x1={padding}
              y1={height - padding}
              x2={width - 10}
              y2={height - padding}
              stroke="#aaa"
            />

            {/* Labels */}
            <text x={5} y={20} fontSize="10" fill="#aaa">
              ${max.toFixed(2)}
            </text>
            <text x={5} y={height - padding} fontSize="10" fill="#aaa">
              ${min.toFixed(2)}
            </text>
            <text
              x={width / 2}
              y={height - 5}
              fontSize="10"
              fill="#aaa"
              textAnchor="middle"
            >
              Last {range} days
            </text>

            {/* Line */}
            <polyline
              fill="none"
              stroke="#4f7cff"
              strokeWidth="2"
              points={displayPrices
                .map((p, i) => {
                  const x =
                    padding +
                    (i / (displayPrices.length - 1)) *
                      (width - padding - 10);
                  const y =
                    height -
                    padding -
                    ((p[1] - min) / (max - min || 1)) *
                      (height - padding - 20);
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
