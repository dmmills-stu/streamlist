'use client';

import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css'
import MovieList from "@/components/MovieList"
import { Movie } from '@/types/MovieProps';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const StreamList: React.FC = () => {
  const [streamItem, setStreamItem] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isClient, setIsClient] = useState(false);

  // I opted to use this instead of the useState to load the list to avoid hydration issues.
  useEffect(() => {
    const saved = localStorage.getItem('streamListMovies');
    const storedQuery = localStorage.getItem('streamListInput')
    if (saved) setMovies(JSON.parse(saved));
    if (storedQuery) setStreamItem(JSON.parse(storedQuery));
    setIsClient(true);
  }, []);

  // Without this, the input for adding a movie will be read-only.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamItem(event.target.value);
    localStorage.setItem('streamListInput', JSON.stringify(event.target.value));
  };

  // Adds a new movie to the list.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (streamItem.trim() !== '') {
      console.log('User Input:', streamItem);
      setMovies([...movies, { id: uuidv4(), title: streamItem, watched: false, inEdit: false}]);
      setStreamItem('');
    } else {
      console.log('Error: Empty input submitted.');
    }
  };

  // Clears the list without saving.
  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    setMovies([]);
    toast.success("List cleared.", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
    setStreamItem('');
    localStorage.setItem('streamListInput', '');
    console.log('List cleared.');
  }

  // Flip the boolean for "watched" when clicked.
  const handleWatched = (id: string) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  // Removes the movie from the list based on which one was clicked to be deleted.
  const handleDelete = (id: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  // Saves the list to localStorage.
  const handleSave = (updatedList: Movie[]) => {
    setMovies(updatedList);
    localStorage.setItem('streamListMovies', JSON.stringify(updatedList));
    toast.success("List saved!", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
    console.log(updatedList);
  };

  // Saves the edited item in the list.
  const handleItemSave = (id: string, newTitle: string) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, title: newTitle } : movie
      )
    );
  };

  // Clears and deletes the list from localStorage.
  const handleClearAndSave = (event: React.FormEvent) => {
    event.preventDefault();
    const ok = confirm('Are you sure you want to clear your cart? This cannot be undone.');
    if(!ok) return;
    toast.success("List cleared and saved!", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
    setStreamItem('');
    localStorage.setItem('streamListInput', '');
    setMovies([]);
    console.log('List deleted from localStorage.');
    handleSave([]);
  }

  return (
    <main className="main-content">
      <h1 className="main-header">StreamList Application</h1>
      <div className="form-container">
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

        {/* If we have any movies in the list, we will display them and the buttons that interact with them. */}
        {movies.length > 0 && (
          <div className="movie-list-wrapper">
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
              <button
                type="button"
                onClick={handleClear}
                className="form-button"
              >
                Clear List
              </button>
              <button
                type="button"
                onClick={() => handleSave(movies)}
                className="form-button"
              >
                Save List
              </button>
              <button
                type="button"
                onClick={handleClearAndSave}
                className="form-button"
              >
                Clear & Save
              </button>
            </div>
          </div>
        )}
    </main>
  );
};

export default StreamList;