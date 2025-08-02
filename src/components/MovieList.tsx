import { Movie } from "../types/MovieProps"
import MovieItem from "./MovieItem"

type MovieListProps = {
  movies: Movie[];
  onWatched: (index: number) => void;
  onDelete: (index: number) => void;
  onItemSave: (index: number, newTitle: string) => void;
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

    {movies.map((movie, index) => (
      <MovieItem
        key={index}
        title={movie.title}
        watched={movie.watched}
        inEdit={movie.inEdit}
        onWatched={() => onWatched(index)}
        onDelete={() => onDelete(index)}
        onItemSave={(newTitle) => onItemSave(index, newTitle)}
      />
    ))}
  </ul>
);

export default MovieList;