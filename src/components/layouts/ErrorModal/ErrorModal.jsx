/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import * as Styled from "./ErrorModal.styled";
import { ModalWindow } from "components/layouts";

export default function ErrorModal({ status }) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!status.error) return;

    if (!openModal) setOpenModal(true);
  }, [status.error]);

  return (
    <Styled.ErrorModal>
      <ModalWindow
        activeModal={status.error && openModal}
        closeModal={() => setOpenModal(false)}
        backdrop={false}
      >
        <div className="error-modal__window">
          <span>{status.message}</span>
          <button onClick={() => setOpenModal(false)}>დახურვა</button>
        </div>
      </ModalWindow>
    </Styled.ErrorModal>
  );
}
