import { useState, useEffect } from "react";
import { MovieItemProps } from "../types/MovieItemProps";
import { IconContext } from "react-icons";
import { MdEdit, MdCancel, MdDelete, MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";

const MovieItem: React.FC<MovieItemProps> = ({ title, watched, inEdit, onWatched, onDelete, onItemSave }) => {
  const [isEditing, setIsEditing] = useState(inEdit);
  const [editedTitle, setEditedTitle] = useState(title);

  // Prevents the incorrect title being displayed for editing an item if items shift in the list.
  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  // Without this, the input when editing will not update, making it effectively read-only.
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }

  const handleSave = () => {
      if (editedTitle.trim()) {
      onItemSave(editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  // If we are editing, change the icons for "Edit" and "Delete" to be "Save" and "Cancel." Also, change the title from a span element to an input to allow for adjustments.
  return (
    <li className="movie-item">
      <button onClick={onWatched} className="col-watched" aria-label={watched ? "Mark as unwatched" : "Mark as watched"}>
        <IconContext.Provider value={{ className: "react-icon" }}>
          { watched ? (
            <MdCheckBox />
          ) : (
            <MdCheckBoxOutlineBlank />
          ) }
        </IconContext.Provider>
      </button>
      {isEditing ? (
        <input 
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          placeholder="Enter a movie or show..."
          className="edit-input"
          aria-label="Edit movie title"
        />
      ) : ( 
      <span className="movie-title col-title" style={{ textDecoration: watched ? "line-through" : "none" }}>
        {title}
      </span>
      )}
      {isEditing ? (
        <button onClick={handleSave} className="col-edit" aria-label="Save movie title">
          <span>
            Save
          </span>
          <IconContext.Provider value={{ className: "react-icon" }}>
            <AiFillSave />
          </IconContext.Provider>
        </button>
      ) : (
        <button onClick={handleEdit} className="col-edit" aria-label="Edit movie title">
          <IconContext.Provider value={{ className: "react-icon" }}>
            <MdEdit />
          </IconContext.Provider>
        </button>
      )}
      {isEditing ? (
        <button onClick={handleCancel} className="col-delete" aria-label="Cancel editing">
          <span>
            Cancel
          </span>
          <IconContext.Provider value={{ className: "react-icon" }}>
            <MdCancel />
          </IconContext.Provider>
        </button>
      ) : (
        <button onClick={onDelete} className="col-delete" aria-label="Delete movie">
          <IconContext.Provider value={{ className: "react-icon" }}>
            <MdDelete />
          </IconContext.Provider>
        </button>
      )}
    </li>
  );
};

export default MovieItem;