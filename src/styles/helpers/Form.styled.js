import { css } from "styled-components";

export const input = css`
  input,
  textarea {
    border-radius: 0.5rem;
    outline: none;
  }

  textarea {
    padding: 1rem;
  }

  input {
    padding: 0 1rem;
    height: 4rem;
  }

  input,
  textarea {
    ${({ theme }) =>
      theme.mode === "DARK"
        ? ""
        : css`
            border: 1px solid ${theme.colors.gray_shade};
          `}

    &:active,
    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.blue};
      outline-offset: 1px;
      border: 1px solid ${({ theme }) => theme.colors.green};
    }

    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.md};
      opacity: 0.7;
    }
  }
`;

export const label = css`
  label {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.md};
    cursor: pointer;
  }
`;

export const inputFiled = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  ${label}

  ${input};

  blockquote {
    display: none;
  }

  input:focus ~ blockquote {
    display: block;
  }

  p {
    color: ${({ theme }) => theme.colors.red};
  }

  blockquote,
  p {
    font-weight: 300;
    font-size: ${({ theme }) => theme.fontSize.sm};

    &::first-letter {
      text-transform: capitalize;
    }
  }
`;
