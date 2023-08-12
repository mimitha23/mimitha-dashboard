import * as Styled from "./ModalWindow.styled";
import { CloseXIcon } from "../Icons/index";

export default function ModalWindow({
  children,
  backdrop = true,
  activeModal,
  closeModal,
}) {
  return (
    activeModal && (
      <Styled.ModalWindowContainer
        className={activeModal ? "active-modal" : ""}
        backdrop={backdrop ? true : undefined}
        onClick={closeModal}
        data-modal
      >
        <div className="content-box" onClick={(e) => e.stopPropagation()}>
          <div className="close-modal__btn-box">
            <button className="close-modal__btn" onClick={closeModal}>
              <CloseXIcon />
            </button>
          </div>

          {children}
        </div>
      </Styled.ModalWindowContainer>
    )
  );
}
