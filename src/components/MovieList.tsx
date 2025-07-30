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