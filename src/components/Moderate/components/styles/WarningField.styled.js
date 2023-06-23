import styled from "styled-components";
import { inputFiled } from "styles/helpers/Form.styled";

export const WarningField = styled.div`
  grid-column: span 2;
  ${inputFiled};

  .entered-warnings__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    padding-left: 1.5rem;
    margin-top: 0.75rem;

    &-item {
      display: grid;
      grid-template-columns: 1fr 2rem 2rem;
      align-items: start;
      gap: 1rem;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0.5rem;
        left: -1.5rem;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 100%;
        background: ${({ theme }) => theme.colors.text};
      }
    }
  }
`;
