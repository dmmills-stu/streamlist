import { useState } from "react";
import { MovieItemProps } from "../types/MovieItemProps";

const MovieItem: React.FC<MovieItemProps> = ({ title, watched, inEdit, onWatched, onDelete, onItemSave }) => {
  const [isEditing, setIsEditing] = useState(inEdit);
  const [editedTitle, setEditedTitle] = useState(title);

  // Because the checkbox is not conditionally rendered, I decided to change the SVG path based on whether or not the box was checked.
  const checkboxPath = watched
    ? "m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
    : "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z";

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
      <button onClick={onWatched} className="col-watched">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
            <path d={checkboxPath} />
        </svg>
      </button>
      {isEditing ? (
        <input 
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          placeholder="Enter a movie or show..."
          className="edit-input"
        />
      ) : ( 
      <span className="movie-title col-title" style={{ textDecoration: watched ? "line-through" : "none" }}>
        {title}
      </span>
      )}
      {isEditing ? (
        <button onClick={handleSave} className="col-edit">
          <span>
            Save
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
          </svg>
        </button>
      ) : (
        <button onClick={handleEdit} className="col-edit">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
        </button>
      )}
      {isEditing ? (
        <button onClick={handleCancel} className="col-delete">
          <span>
            Cancel
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </button>
      ) : (
        <button onClick={onDelete} className="col-delete">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
        </button>
      )}
    </li>
  );
};

export default MovieItem;