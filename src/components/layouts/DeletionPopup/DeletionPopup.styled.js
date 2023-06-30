import styled from "styled-components";

export const DeletionPopup = styled.div`
  position: fixed;
  z-index: 99;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.black_tr_05};

  .deletion-window {
    width: max(20rem, 45rem);
    aspect-ratio: 16/7;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.bg};
    box-shadow: ${({ theme }) =>
      theme.mode === "DARK"
        ? theme.shadow.bottom_right_md_light
        : theme.shadow.bottom_right_md_dark};
    position: relative;

    &__close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 2.2rem;
    }

    &__message {
      align-self: center;
      margin-top: auto;

      &-target {
        color: ${({ theme }) => theme.colors.blue};
      }
    }

    &__actions-box {
      margin-top: auto;
      align-self: flex-end;
      display: flex;
      align-items: center;
      gap: 2rem;

      &--btn {
        padding: 1rem 3rem;
        border-radius: 0.5rem;
      }

      &--btn.close {
        font-weight: 600;
      }

      &--btn.confirm {
        background: ${({ theme }) => theme.colors.red};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
