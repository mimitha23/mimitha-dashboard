import styled, { css } from "styled-components";
import { errMessageStyles } from "styles/helpers/Form.styled";

export const Login = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30rem;
  }

  .password-field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.white};
    ${({ theme }) =>
      theme.mode === "DARK"
        ? ""
        : css`
            border: 1px solid ${theme.colors.gray_shade};
          `};

    &:has(input:active),
    &:has(input:focus) {
      outline: 1px solid ${({ theme }) => theme.colors.blue};
      outline-offset: 1px;
      border: 1px solid ${({ theme }) => theme.colors.green};
    }

    input {
      outline: none;
      border: none;
    }

    button {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.dark_gray};
      display: flex;
      align-items: center;
    }
  }

  .auth-msg {
    ${errMessageStyles}
  }
`;
