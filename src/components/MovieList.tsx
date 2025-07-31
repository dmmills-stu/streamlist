import { Movie } from "../types/Movie"
import MovieItem from "./MovieItem"

type MovieListProps = {
  movies: Movie[];
  onWatched: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const MovieList: React.FC<MovieListProps> = ({ movies, onWatched, onEdit, onDelete }) => (
  <ul className="movie-list">
    {movies.length > 0 && (
      <li className="title-list">
        <span className="button-title">
          Watched?
        </span>
        <span className="title-title">
          Movie Title
        </span>
        <span className="button-title">
          Edit
        </span>
        <span className="button-title">
          Delete
        </span>
      </li>
    )}

    {movies.map((movie, index) => (
      <MovieItem
        key={index}
        title={movie.title}
        watched={movie.watched}
        onWatched={() => onWatched(index)}
        onEdit={() => onEdit(index)}
        onDelete={() => onDelete(index)}
      />
    ))}
  </ul>
);

export default MovieList;