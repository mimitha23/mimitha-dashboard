import styled from "styled-components";
import { Form } from "styles/helpers";

export const SizeField = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .size-field__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${Form.label};

    .size-field__add-btn {
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
    }
  }

  .size-field__inps-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .size-field__inps {
      display: grid;
      grid-template-columns: 1fr 15rem;
      align-items: start;
      align-content: start;
      gap: 2rem;
      position: relative;

      &-amount--inp {
        ${Form.inputFiled};
        /* margin-top: 0.5rem; */
      }

      .size-field__remove-btn {
        position: absolute;
        top: -1.5rem;
        right: 0;

        &:hover {
          color: ${({ theme }) => theme.colors.red};
        }
      }
    }
  }
`;
