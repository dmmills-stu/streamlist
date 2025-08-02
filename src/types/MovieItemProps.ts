import { Movie } from "./MovieProps"

export type MovieItemProps = Movie & {
    onWatched: () => void;
    onDelete: () => void;
    onItemSave: (newString: string) => void;
}