'use client';

import React, { useState } from 'react';
import '../styles/MainPage.css'
import MovieList from "@/components/MovieList"
import { Movie } from '@/types/Movie';

const StreamList: React.FC = () => {
  const [streamItem, setStreamItem] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamItem(event.target.value);
  };

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

  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    setMovies([]);
  }

  const handleWatched = (index: number) => {
    setMovies((prev) =>
      prev.map((movie, i) =>
        i === index ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleDelete = (index: number) => {
    setMovies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {};

  const handleItemSave = (index: number, newTitle: string) => {
    const updatedMovies = [...movies];
    updatedMovies[index].title = newTitle;
    setMovies(updatedMovies);
  };

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

        {movies.length > 0 && (
          <div className="movie-list-wrapper">
            <MovieList
              movies={movies}
              onWatched={handleWatched}
              onDelete={handleDelete}
              onItemSave={handleItemSave}
            />
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
                onClick={handleSave}
                className="form-button"
              >
                Save List
              </button>
            </div>
          </div>
        )}
    </main>
  );
};

export default StreamList;