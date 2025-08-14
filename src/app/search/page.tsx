"use client";

import '../../styles/SearchPage.css';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { TMDBMovie } from '@/types/TMDBMovie';

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

// Helper for constructing TMDB search URLs
const buildSearchUrl = (query: string) => {
  const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!key) return null;
  return `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(
    query
  )}&include_adult=false`;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedResults) setResults(JSON.parse(storedResults));
    if (storedQuery) setQuery(storedQuery);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term!", {
        duration: 3000,
        style: { background: "#444", color: "#fff" },
      });
      return;
    }
    const url = buildSearchUrl(query);
    if (!url) {
      toast.error("TMDB API key is missing! Please set NEXT_PUBLIC_TMDB_API_KEY.", {
        duration: 4000,
        style: { background: "#b91c1c", color: "#fff" },
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      localStorage.setItem("searchResults", JSON.stringify(data.results));
      localStorage.setItem("searchQuery", query);
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch results!", {
        duration: 3000,
        style: { background: "#444", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="search-page">
      <h1 className="search-header">Search Movies</h1>
      <div className="search-form-div">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title..."
            className="search-input"
          />
          <div className="search-button-div">
            <button type="submit" disabled={loading} className="search-submit">
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      <section className="results-grid">
        {results.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
                width={120}
                height={180}
                className="movie-poster"
              />
            ) : (
              <Image
                src="/icons/NoMoviePoster.png"
                alt="No Movie Poster"
                width={120}
                height={180}
                className="movie-poster"
              />
            )}
            <h2 className="movie-title">{movie.title}</h2>
            <p className="release-date">
              Relased: {movie.release_date?.substring(0, 4) || "Unknown Year"}
            </p>
            <p className="overview">{movie.overview}</p>
          </div>
        ))}
      </section>
    </main>
  );
}