// src/app/about/page.js
import Link from "next/link";

// Static data (no dynamic fetching, ensuring SSG)
const aboutMe = {
  name: "Tejas Mohan Konde",
  message:
    "I'm a Web Developer. Stood 2nd in post-graduation (M.Sc. in Computer Science). Certified in PreCAT and skilled in HTML, CSS, JavaScript, React, Node.js, MongoDB. Passionate about building scalable web applications and exploring Big Data, AI, and emerging technologies. Seeking opportunities to contribute and grow in the tech industry",
  buildDate: new Date().toLocaleString(), // Shows when the page was built
};

export default function About() {
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

      {/* About Content */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent mb-4">
          About Me 👤
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-2">Hi, I’m {aboutMe.name}!</p>
        <p className="text-sm sm:text-base text-gray-700 mb-4">{aboutMe.message}</p>
        <p className="text-xs sm:text-sm text-gray-600">
          Page built on: {aboutMe.buildDate}
        </p>
      </div>
    </div>
  );
}

// Metadata for SEO (optional)
export const metadata = {
  title: "About - NextCrypto",
  description: "A statically generated About page for the NextCrypto app by Tejas Mohan Konde.",
};
