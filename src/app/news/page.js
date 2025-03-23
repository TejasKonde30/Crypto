import Link from "next/link";

export const dynamic = "force-dynamic"; // Ensures fresh data on every request

async function getCryptoNews() {
  const res = await fetch(
    "https://cryptopanic.com/api/v1/posts/?public=true",
    { cache: "no-store" } // Ensures fresh data is fetched every time
  );

  const data = await res.json();

  return data.results.slice(0, 10).map((news) => ({
    title: news.title,
    url: news.url,
    source: news.source.title,
    published_at: new Date(news.published_at).toLocaleString(),
  }));
}

export default async function CryptoNewsPage() {
  const news = await getCryptoNews();

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

      {/* Heading */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent text-center mb-6">
        📰 Latest Crypto News
      </h1>

      {/* News Articles */}
      <div className="w-full max-w-3xl space-y-6 mx-auto">
        {news.map((article, index) => (
          <div
            key={index}
            className="p-5 bg-gray-100 rounded-lg shadow-md border border-gray-300 transform transition-all hover:scale-105 hover:shadow-lg hover:border-cyan-500"
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2 className="text-2xl font-semibold text-cyan-600 hover:text-cyan-700 transition">
                {article.title}
              </h2>
            </a>
            <p className="text-sm text-gray-600 mt-2">
              📰 Source: {article.source} | ⏳ {article.published_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
