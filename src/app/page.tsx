'use client';

import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css'
import MovieList from "@/components/MovieList"
import { Movie } from '@/types/MovieProps';

const StreamList: React.FC = () => {
  const [streamItem, setStreamItem] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isClient, setIsClient] = useState(false);

  // I opted to use this instead of the useState to load the list to avoid hydration issues.
  useEffect(() => {
    const saved = localStorage.getItem('streamListMovies');
    if (saved) {
      setMovies(JSON.parse(saved));
    }
    setIsClient(true);
  }, []);

  // Without this, the input for adding a movie will be read-only.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamItem(event.target.value);
  };

  // Adds a new movie to the list.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (streamItem.trim() !== '') {
      console.log('User Input:', streamItem);
      setMovies([...movies, { title: streamItem, watched: false, inEdit: false}]);
      setStreamItem('');
    } else {
      console.log('Error: Empty input submitted.');
    }
  };

  // Clears the list without saving.
  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    setMovies([]);
    console.log('List cleared.');
  }

  // Flip the boolean for "watched" when clicked.
  const handleWatched = (index: number) => {
    setMovies((prev) =>
      prev.map((movie, i) =>
        i === index ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  // Removes the movie from the list based on which one was clicked to be deleted.
  const handleDelete = (index: number) => {
    setMovies((prev) => prev.filter((_, i) => i !== index));
  };

  // Saves the list to localStorage.
  const handleSave = (updatedList: Movie[]) => {
    setMovies(updatedList);
    localStorage.setItem('streamListMovies', JSON.stringify(updatedList));
    console.log(updatedList);
  };

  // Saves the edited item in the list.
  const handleItemSave = (index: number, newTitle: string) => {
    const updatedMovies = [...movies];
    updatedMovies[index].title = newTitle;
    setMovies(updatedMovies);
  };

  // Clears and deletes the list from localStorage.
  const handleClearAndSave = (event: React.FormEvent) => {
    event.preventDefault();
    setMovies([]);
    console.log('List deleted from localStorage.');
    handleSave([]);
  }

  return (
    <main>
      <h1>StreamList Application</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={streamItem}
            onChange={handleInputChange}
            placeholder="Enter a movie or show..."
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