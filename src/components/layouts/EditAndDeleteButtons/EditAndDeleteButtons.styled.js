import styled, { css } from "styled-components";

export const EditAndDeleteButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  ${({ is_absolute }) =>
    is_absolute === 1 &&
    css`
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;

      .edit-and-delete__btn {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${({ theme }) => theme.colors.black_tr_05};
        color: ${({ theme }) => theme.colors.white} !important;
      }
    `}

  .edit-and-delete__btn {
    font-size: 2rem;

    &.edit {
      margin-left: auto;
      color: ${({ theme }) => theme.colors.blue};
    }

    &.delete {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;
