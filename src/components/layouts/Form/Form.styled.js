import styled from "styled-components";
import { scrollbar, Form as FormStyles } from "styles/helpers";

export const Form = styled.form``;

export const Input = styled.div`
  ${FormStyles.inputFiled};

  .form__input-file--label {
    text-align: center;
    border-radius: 0.5rem;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.md};
    cursor: pointer;
  }
`;

export const InputTextarea = styled.div`
  ${FormStyles.inputFiled};

  .form__input-textarea {
    resize: none;
    height: 8rem;
  }
`;

export const InputFilterableSelect = styled.div`
  ${FormStyles.inputFiled};
  position: relative;

  .form__input-field {
    text-transform: capitalize;
  }

  .filterable_dropdown {
    position: absolute;
    z-index: 9;
    top: calc(100% + 1rem);
    left: 0;
    right: 0;
    padding: 0 1rem;
    border-radius: 0.5rem;
    max-height: 20rem;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  }

  .filterable_dropdown-list {
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
      text-transform: capitalize;

      &:hover {
        background: ${({ theme }) => theme.colors.blue};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2rem;
  width: 100%;
  border-radius: 0.5rem;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.green_shade};
  }
`;
