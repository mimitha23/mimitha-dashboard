import styled from "styled-components";
import { Form } from "styles/helpers";

export const WarningField = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${Form.label};
  ${Form.error};

  .warning-fields--box {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__field {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  .add-warning--btn {
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-top: 0.5rem;
    text-decoration: underline;
    align-self: flex-end;
    color: ${({ theme }) => theme.colors.blue};
  }

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
      grid-template-rows: repeat(3, max-content);
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

      &--btn {
        grid-row: 1;
      }

      &--btn.edit {
        grid-column: 2;
      }

      &--btn.remove {
        grid-column: 3;
      }

      &--label {
        text-align: start;
        color: ${({ theme }) => theme.colors.white};

        span:first-child {
          text-transform: lowercase;
        }

        &.label_ka {
          grid-row: 2;
        }

        &.label_en {
          grid-row: 3;
        }
      }
    }
  }
`;
