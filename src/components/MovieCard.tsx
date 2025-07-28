import { MovieCardProps } from '../types/MovieCard.types';

const MovieCard = ({ title, year }: MovieCardProps) => (
  <div>
    <h3>{title}</h3>
    <p>{year}</p>
  </div>
);

export default MovieCard;