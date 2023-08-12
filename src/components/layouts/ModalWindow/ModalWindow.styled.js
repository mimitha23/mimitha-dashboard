import styled, { css } from "styled-components";
// import { animatePopUpAndScale } from "styles/helpers";

export const ModalWindowContainer = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ backdrop }) =>
    backdrop
      ? css`
          background: ${({ theme }) => theme.colors.black_tr_05};
          backdrop-filter: blur(3px);
        `
      : ""}

  .content-box {
    border-radius: 0.5rem;
    padding: 0.5rem;
    overflow: hidden;
    box-shadow: ${({ theme }) =>
      theme.mode === "light"
        ? theme.shadow.radial_lg_dark
        : theme.shadow.radial_lg_light};
    background: ${({ theme }) => theme.colors.bg};
    position: relative;

    .close-modal__btn-box {
      width: 100%;
      height: 3rem;
    }

    .close-modal__btn {
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
      font-size: 2.5rem;
      height: 2.5rem;
    }
  }
`;
