"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function CryptoCharts() {
  const [data, setData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`
    );

    socket.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      setData((prevData) => [
        ...prevData.slice(-29),
        { time: new Date().toLocaleTimeString(), price: parseFloat(trade.p) },
      ]);
    };

    return () => socket.close(); // Cleanup WebSocket on unmount
  }, [selectedCoin]);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-6">
      {/* Navbar */}
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

      {/* Chart Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">
        Real-Time Crypto Charts 📈
      </h1>

      {/* Dropdown to Select Cryptocurrency */}
      <div className="flex justify-center mb-4">
        <select
          className="w-full sm:w-auto p-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
          onChange={(e) => setSelectedCoin(e.target.value)}
          value={selectedCoin}
        >
          <option value="BTCUSDT">Bitcoin (BTC/USDT)</option>
          <option value="ETHUSDT">Ethereum (ETH/USDT)</option>
          <option value="BNBUSDT">Binance Coin (BNB/USDT)</option>
        </select>
      </div>

      {/* Live Chart */}
      <div className="w-full max-w-3xl mx-auto">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              tick={{ fill: "#6B7280", fontSize: 10 }} 
              interval="preserveStartEnd"
              tickFormatter={(time) => time.slice(0, 5)} // Shorten time on mobile
            />
            <YAxis 
              tick={{ fill: "#6B7280", fontSize: 10 }} 
              domain={["auto", "auto"]} 
              width={40} // Reduced width for mobile
            />
            <Tooltip 
              contentStyle={{ fontSize: 12 }} 
              formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#22c55e" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
