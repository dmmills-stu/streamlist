import { Movie } from "./Movie"

export type MovieItemProps = Movie & {
    onWatched: () => void;
    onDelete: () => void;
    onItemSave: (newString: string) => void;
}