import Link from "next/link";

export const dynamic = "force-dynamic"; // Ensures fresh data on every request

async function getCryptoNews() {
  try {
    // Use environment variable for API key, fallback to public mode
    const apiKey = process.env.CRYPTO_PANIC_API_KEY;
    const url = apiKey
      ? `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}`
      : "https://cryptopanic.com/api/v1/posts/?public=true"; // Fallback to public endpoint

    console.log("Fetching news from:", url); // Debug log

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store", // Ensures fresh data
      next: { revalidate: 0 }, // Force revalidation
    });

    console.log("Response status:", res.status); // Debug log
    console.log("Response headers:", [...res.headers.entries()]); // Debug log

    if (!res.ok) {
      const errorText = await res.text(); // Get error details
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    const data = await res.json();

    if (!data.results) {
      throw new Error("No results found in API response");
    }

    return data.results.slice(0, 10).map((news) => ({
      title: news.title,
      url: news.url,
      source: news.source.title,
      published_at: new Date(news.published_at).toLocaleString(),
    }));
  } catch (error) {
    console.error("Error fetching crypto news:", error.message);
    // Fallback data with error info
    return [
      {
        title: `Failed to load news: ${error.message}`,
        url: "#",
        source: "CryptoPanic",
        published_at: new Date().toLocaleString(),
      },
    ];
  }
}

export default async function CryptoNewsPage() {
  const news = await getCryptoNews();

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

      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent text-center mb-6">
        📰 Latest Crypto News
      </h1>

      {/* News Articles */}
      <div className="w-full max-w-3xl space-y-4 mx-auto">
        {news.map((article, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 bg-gray-100 rounded-lg shadow-md border border-gray-300 transform transition-all hover:scale-[1.02] sm:hover:scale-105 hover:shadow-lg hover:border-cyan-500"
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2 className="text-lg sm:text-2xl font-semibold text-cyan-600 hover:text-cyan-700 transition line-clamp-2">
                {article.title}
              </h2>
            </a>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-1">
              📰 Source: {article.source} | ⏳ {article.published_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
