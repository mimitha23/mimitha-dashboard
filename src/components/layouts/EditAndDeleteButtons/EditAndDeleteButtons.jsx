import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import * as Styled from "./EditAndDeleteButtons.styled";

export default function EditAndDeleteButtons({ onEdit, onDelete, isAbsolute }) {
  return (
    <Styled.EditAndDeleteButtons
      data-edit-and-delete-buttons
      is_absolute={isAbsolute ? 1 : 0}
    >
      {onEdit && (
        <button
          className="edit-and-delete__btn edit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
        >
          <EditIcon />
        </button>
      )}
      {onDelete && (
        <button
          className="edit-and-delete__btn delete"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon />
        </button>
      )}
    </Styled.EditAndDeleteButtons>
  );
}
