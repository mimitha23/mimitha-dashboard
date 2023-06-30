import * as Styled from "./DeletionPopup.styled";
import { CloseXIcon } from "../Icons";

export default function DeletionPopup({ targetName, onClose, onConfirm }) {
  return (
    <Styled.DeletionPopup onClick={() => onClose()}>
      <div className="deletion-window" onClick={(e) => e.stopPropagation()}>
        <button
          className="deletion-window__close-btn"
          onClick={() => onClose()}
        >
          <CloseXIcon />
        </button>
        <span className="deletion-window__message">
          დარწმუნებული ხართ გინდათ წაშალოთ ეს{" "}
          <span className="deletion-window__message-target">{targetName}</span>
          &nbsp;?
        </span>
        <div className="deletion-window__actions-box">
          <button
            className="deletion-window__actions-box--btn close"
            onClick={() => onClose()}
          >
            დახურვა
          </button>
          <button
            className="deletion-window__actions-box--btn confirm"
            onClick={() => onConfirm()}
          >
            დიახ
          </button>
        </div>
      </div>
    </Styled.DeletionPopup>
  );
}
