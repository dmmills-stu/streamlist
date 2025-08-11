import { Movie } from "../types/MovieProps"
import MovieItem from "./MovieItem"

type MovieListProps = {
  movies: Movie[];
  onWatched: (index: string) => void;
  onDelete: (index: string) => void;
  onItemSave: (index: string, newTitle: string) => void;
};

const MovieList: React.FC<MovieListProps> = ({ movies, onWatched, onDelete, onItemSave }) => (
  <ul className="movie-list">
    {movies.length > 0 && (
      <li className="table-header">
        <span className="col-watched">
          Watched?
        </span>
        <span className="col-title">
          Movie Title
        </span>
        <span className="col-edit">
          Edit
        </span>
        <span className="col-delete">
          Delete
        </span>
      </li>
    )}

    {movies.map((movie) => (
      <MovieItem
        key={movie.id}
        id={movie.id}
        title={movie.title}
        watched={movie.watched}
        inEdit={movie.inEdit}
        onWatched={() => onWatched(movie.id)}
        onDelete={() => onDelete(movie.id)}
        onItemSave={(newTitle) => onItemSave(movie.id, newTitle)}
      />
    ))}
  </ul>
);

export default MovieList;