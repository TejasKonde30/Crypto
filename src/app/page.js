"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    const connectSocket = () => {
      socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const topCoins = data
          .filter((coin) => coin.s.endsWith("USDT"))
          .slice(0, 50)
          .map((coin) => ({
            symbol: coin.s,
            price: parseFloat(coin.c).toFixed(2),
            change: parseFloat(coin.P).toFixed(2),
            volume: parseFloat(coin.v).toLocaleString(),
            high: parseFloat(coin.h).toFixed(2),
            low: parseFloat(coin.l).toFixed(2),
            bid: parseFloat(coin.b).toFixed(2),
            ask: parseFloat(coin.a).toFixed(2),
          }));

        setCoins(topCoins);
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());
      };

      socket.onerror = () => {
        console.error("WebSocket error, reconnecting...");
        setTimeout(connectSocket, 5000);
      };
    };

    connectSocket();
    return () => socket.close();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-6">
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-0">
          NextCrypto
        </h1>
        <div className="flex flex-wrap justify-center gap-2 sm:space-x-4">
          <Link href="/">
            <button className="px-3 py-2 text-sm sm:text-base text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md transform hover:scale-105">
              🚀 Home
            </button>
          </Link>
          <Link href="/news">
            <button className="px-3 py-2 text-sm sm:text-base text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md transform hover:scale-105">
              📰 Crypto News
            </button>
          </Link>
          <Link href="/charts">
            <button className="px-3 py-2 text-sm sm:text-base text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md transform hover:scale-105">
              📈 Crypto Charts
            </button>
          </Link>
          <Link href="/about">
            <button className="px-3 py-2 text-sm sm:text-base text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md transform hover:scale-105">
              👤 About
            </button>
          </Link>
        </div>
      </nav>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search for a coin..."
          className="w-full p-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
        />
      </div>

      {/* Last Updated */}
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        ⏳ Last Updated: {lastUpdated || "Fetching..."}
      </p>

      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-cyan-600">
                <th className="p-2 sm:p-3">Symbol</th>
                <th className="p-2 sm:p-3">Price</th>
                <th className="p-2 sm:p-3">24h%</th>
                <th className="p-2 sm:p-3 hidden md:table-cell">Volume</th>
                <th className="p-2 sm:p-3 hidden lg:table-cell">High</th>
                <th className="p-2 sm:p-3 hidden lg:table-cell">Low</th>
                <th className="p-2 sm:p-3 hidden xl:table-cell">Bid</th>
                <th className="p-2 sm:p-3 hidden xl:table-cell">Ask</th>
              </tr>
            </thead>
            <tbody>
              {coins
                .filter((coin) => coin.symbol.includes(search))
                .map((coin) => (
                  <tr
                    key={coin.symbol}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-2 sm:p-3 text-cyan-600">{coin.symbol}</td>
                    <td className="p-2 sm:p-3 text-orange-500">${coin.price}</td>
                    <td
                      className={`p-2 sm:p-3 font-bold ${
                        parseFloat(coin.change) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {coin.change}%
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 hidden md:table-cell">
                      {coin.volume}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 hidden lg:table-cell">
                      ${coin.high}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 hidden lg:table-cell">
                      ${coin.low}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 hidden xl:table-cell">
                      ${coin.bid}
                    </td>
                    <td className="p-2 sm:p-3 text-gray-700 hidden xl:table-cell">
                      ${coin.ask}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
