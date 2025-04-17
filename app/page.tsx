"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ url, alias }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong");
        return;
      }
      setShortUrl(`ENTER VERCEL URL HERE/${alias}`);
    } catch {
      setError("Error, please try again");
    }
  };

  return (
      <main className="flex flex-col items-center justify-center px-4 flex-grow pt-25">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">Snipster</h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Create custom short links in just a snip!
          </p>
        </div>

        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full max-w-xl"
        >
          <input
              type="text"
              placeholder="Long URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              required
          />
          <input
              type="text"
              placeholder="Custom Alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
          />
          <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md text-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
          >
            Snip
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {shortUrl && (
            <p className="mt-4 text-center text-lg text-gray-800">
              Snipped URL:{" "}
              <a
                  href={shortUrl}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </p>
        )}
      </main>
  );
}
