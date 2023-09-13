import styled from "styled-components";
import { Form as FormStyles } from "styles/helpers";

export const Form = styled.form``;

export const Input = styled.div`
  ${FormStyles.inputFiled};

  &.form__input-file
    .form__file-icon--review
    .form__file-icon--review__fig.multiple {
    position: relative;

    .multiple-file__close-btn {
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      background: ${({ theme }) => theme.colors.black_tr_05};
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    &:hover .multiple-file__close-btn {
      pointer-events: all;
      opacity: 1;
    }
  }

  .form__input-text--box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

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

export const InputCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  ${Form.label};
  ${Form.error};

  .checkbox__field {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const InputFilterableSelect = styled.div`
  ${FormStyles.inputFiled};
  position: relative;

  .form__input-field {
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
    ${FormStyles.selectDropdownList}
  }
`;

export const InputMultipleFilterableSelect = styled(InputFilterableSelect)`
  .filterable_dropdown {
    top: 7rem;

    .selected-field {
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .selected-fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* align-items: center; */
    gap: 0.5rem;
    margin-top: 0.5rem;

    &--item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
      padding: 0.5rem;
      border-radius: 0.5rem;
      font-size: ${({ theme }) => theme.fontSize.sm};
      span {
        line-height: 1;
      }

      button {
        display: flex;
        align-items: center;
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

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.green_shade};
  }

  &:disabled {
    opacity: 0.5;
    cursor: none;
  }
`;

export const RemoveFieldButton = styled.button`
  position: absolute;
  top: -2rem;
  right: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const AddFieldButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.md};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    line-height: 1;
  }

  span:last-child {
    display: flex;
    align-items: center;
    margin-top: 0.4rem;
  }
`;

export const DynamicFieldHeader = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  label {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
