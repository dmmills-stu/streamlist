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
      setMovies([...movies, { title: streamItem, watched: false}]);
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

  const handleEdit = (index: number) => {
    const newTitle = prompt("Edit title", movies[index].title);
    if (newTitle) {
      setMovies((prev) =>
        prev.map((movie, i) => (i === index ? { ...movie, title: newTitle } : movie))
      );
    }
  };

  const handleDelete = (index: number) => {
    setMovies((prev) => prev.filter((_, i) => i !== index));
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
              Submit
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="form-button"
            >
              Clear List
            </button>
          </div>
        </form>
      </div>

        {movies && (
          <MovieList
            movies={movies}
            onWatched={handleWatched}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
    </main>
  );
};

export default StreamList;