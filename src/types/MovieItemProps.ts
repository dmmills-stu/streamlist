import { Movie } from "./Movie"

export type MovieItemProps = Movie & {
    onWatched: () => void;
    onEdit: () => void;
    onDelete: () => void;
}