import { css } from "styled-components";
import scrollbar from "./scrollbar.styled";

export const input = css`
  textarea {
    padding: 1rem;
  }

  input {
    padding: 0 1rem;
    height: 4rem;

    &::-webkit-inner-spin-button {
      display: none;
    }
  }

  input,
  textarea {
    border-radius: 0.5rem;
    outline: none;

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

  input.error,
  textarea.error {
    border: 1px solid ${({ theme }) => theme.colors.red};
  }
`;

export const label = css`
  label {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.md};
    cursor: pointer;
  }
`;

export const error = css`
  p {
    font-weight: 300;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.red};
    text-wrap: balance;
    text-align: center;

    &::first-letter {
      text-transform: capitalize;
    }
  }
`;

export const inputFiled = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  ${label}

  ${input};

  blockquote {
    display: none;
    text-align: center;
    text-wrap: balance;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  input:focus ~ blockquote {
    display: block;
  }

  ${error};
`;

export const selectDropdownList = css`
  max-height: 20rem;
  padding: 1rem 1rem 1rem 0;
  overflow: auto;
  ${scrollbar({ marginBlockTop: "1rem", marginBlockBottom: "1rem" })};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &--item {
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    /* text-transform: capitalize; */

    &:hover {
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
