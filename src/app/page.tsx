"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [coins, setCoins] = useState<
    { symbol: string; price: string; change: string; volume: string; high: string; low: string; bid: string; ask: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    const connectSocket = () => {
      socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const topCoins = data
          .filter((coin: any) => coin.s.endsWith("USDT"))
          .slice(0, 50)
          .map((coin: any) => ({
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
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">
          NextCrypto
        </h1>
        <div className="flex space-x-4">
          <Link href="/">
            <button className="px-4 py-2 text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md shadow-cyan-500/50 hover:shadow-orange-500/50 transform hover:scale-105">
              🚀 Home
            </button>
          </Link>
          <Link href="/news">
            <button className="px-4 py-2 text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md shadow-cyan-500/50 hover:shadow-orange-500/50 transform hover:scale-105">
              📰 Crypto News
            </button>
          </Link>
          <Link href="/charts">
            <button className="px-4 py-2 text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md shadow-cyan-500/50 hover:shadow-orange-500/50 transform hover:scale-105">
              📈 Crypto Charts
            </button>
          </Link>
          <Link href="/about">
            <button className="px-4 py-2 text-white font-semibold rounded-lg transition duration-300 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 shadow-md shadow-cyan-500/50 hover:shadow-orange-500/50 transform hover:scale-105">
              👤 About
            </button>
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search for a coin..."
          className="w-full p-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
        />
      </div>

      <p className="text-sm text-gray-600 mb-4">⏳ Last Updated: {lastUpdated || "Fetching..."}</p>

      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-cyan-600">
              <th className="p-3">Symbol</th>
              <th className="p-3">Price</th>
              <th className="p-3">24h Change</th>
              <th className="p-3">Volume</th>
              <th className="p-3">24h High</th>
              <th className="p-3">24h Low</th>
              <th className="p-3">Bid</th>
              <th className="p-3">Ask</th>
            </tr>
          </thead>
          <tbody>
            {coins
              .filter((coin) => coin.symbol.includes(search))
              .map((coin) => (
                <tr key={coin.symbol} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-3 text-cyan-600">{coin.symbol}</td>
                  <td className="p-3 text-orange-500">${coin.price}</td>
                  <td
                    className={`p-3 font-bold ${parseFloat(coin.change) >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {coin.change}%
                  </td>
                  <td className="p-3 text-gray-700">{coin.volume}</td>
                  <td className="p-3 text-gray-700">${coin.high}</td>
                  <td className="p-3 text-gray-700">${coin.low}</td>
                  <td className="p-3 text-gray-700">${coin.bid}</td>
                  <td className="p-3 text-gray-700">${coin.ask}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}