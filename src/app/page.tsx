'use client';

import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css'
import MovieList from "@/components/MovieList"
import { Movie } from '@/types/MovieProps';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const StreamList: React.FC = () => {
  // State for the input field value
  const [streamItem, setStreamItem] = useState('');
  // State for the list of movies
  const [movies, setMovies] = useState<Movie[]>([]);
  // Used to avoid hydration issues in Next.js
  const [isClient, setIsClient] = useState(false);

  // I opted to use this instead of the useState to load the list to avoid hydration issues.
  // Load saved movies and input from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('streamListMovies');
    const storedQuery = localStorage.getItem('streamListInput');
    if (saved) setMovies(JSON.parse(saved));
    if (storedQuery) setStreamItem(JSON.parse(storedQuery));
    setIsClient(true);
  }, []);

  // Update input field and sync to localStorage
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamItem(event.target.value);
    localStorage.setItem('streamListInput', JSON.stringify(event.target.value));
  };

  // Add a new movie to the list and sync to localStorage
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (streamItem.trim() !== '') {
      console.log('User Input:', streamItem);
      const updatedMovies = [...movies, { id: uuidv4(), title: streamItem, watched: false, inEdit: false}];
      setMovies(updatedMovies);
      localStorage.setItem('streamListMovies', JSON.stringify(updatedMovies));
      setStreamItem('');
      localStorage.setItem('streamListInput', JSON.stringify(''));
    } else {
      console.log('Error: Empty input submitted.');
    }
  };

  // Clear the movie list with confirmation and sync to localStorage
  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    const ok = confirm('Are you sure you want to clear your list? This cannot be undone.');
    if (!ok) return;
    setMovies([]);
    localStorage.setItem('streamListMovies', JSON.stringify([]));
    toast.success("List cleared.", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
    setStreamItem('');
    localStorage.setItem('streamListInput', JSON.stringify(''));
    console.log('List cleared.');
  }

  // Toggle the "watched" status for a movie and sync to localStorage
  const handleWatched = (id: string) => {
    setMovies((prev) => {
      const updated = prev.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      );
      localStorage.setItem('streamListMovies', JSON.stringify(updated));
      return updated;
    });
  };

  // Remove a movie from the list and sync to localStorage
  const handleDelete = (id: string) => {
    setMovies((prev) => {
      const updated = prev.filter((movie) => movie.id !== id);
      localStorage.setItem('streamListMovies', JSON.stringify(updated));
      return updated;
    });
  };

  // (Unused) Save the list to localStorage manually (functionality replaced by auto-sync)
  // const handleSave = (updatedList: Movie[]) => {
  //   setMovies(updatedList);
  //   localStorage.setItem('streamListMovies', JSON.stringify(updatedList));
  //   toast.success("List saved!", {
  //     duration: 3000,
  //     style: { background: "#444", color: "#fff" },
  //   });
  //   console.log(updatedList);
  // };

  // Save the edited movie title and sync to localStorage
  const handleItemSave = (id: string, newTitle: string) => {
    setMovies((prev) => {
      const updated = prev.map((movie) =>
        movie.id === id ? { ...movie, title: newTitle } : movie
      );
      localStorage.setItem('streamListMovies', JSON.stringify(updated));
      return updated;
    });
  };

  // (Unused) Clear and save the list (functionality replaced by auto-sync)
  // const handleClearAndSave = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const ok = confirm('Are you sure you want to clear your cart? This cannot be undone.');
  //   if(!ok) return;
  //   toast.success("List cleared and saved!", {
  //     duration: 3000,
  //     style: { background: "#444", color: "#fff" },
  //   });
  //   setStreamItem('');
  //   localStorage.setItem('streamListInput', '');
  //   setMovies([]);
  //   console.log('List deleted from localStorage.');
  //   handleSave([]);
  // }

  return (
    <main className="main-content">
      {/* Main header for the app */}
      <h1 className="main-header">StreamList Application</h1>
      <div className="form-container">
        {/* Form for adding a new movie to the list */}
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={streamItem}
            onChange={handleInputChange}
            placeholder="Enter a movie or show..."
            className="main-input"
          />
          <div className="button-div">
            <button
              type="submit"
              className="form-button"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>

      {/* Display the movie list and clear button if there are movies */}
      {movies.length > 0 && (
        <div className="movie-list-wrapper">
          {/* Show loading message until client-side hydration is complete */}
          {!isClient ? (
            <p>Loading previous list...</p>
          ) : (
            <MovieList
              movies={movies}
              onWatched={handleWatched}
              onDelete={handleDelete}
              onItemSave={handleItemSave}
            />
          )}
          <div className="button-div button-bot">
            {/* Button to clear the movie list */}
            <button
              type="button"
              onClick={handleClear}
              className="form-button"
            >
              Clear List
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default StreamList;