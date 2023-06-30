import styled from "styled-components";

export const Colors = styled.div`
  padding: 2rem;
  position: relative;

  .all-colors__header {
  }

  .all-colors__list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, max-content));
    gap: 3rem;
    justify-content: space-between;
  }
`;

export const ColorItem = styled.li`
  border-bottom: 1px solid ${({ hex }) => hex};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.75rem;

  .all-colors__list-item--pattern {
    width: 100%;
    height: 4rem;
    border-radius: 0.5rem;
    background: ${({ hex }) => hex};
    display: block;
    position: relative;
    cursor: pointer;

    &::after {
      content: "${({ hex }) => hex}";
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      color: blue;
      transform: translate(-50%, -50%);
      color: ${({ hex }) => hex};
      filter: invert(1);
      font-weight: 300;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover::after {
      opacity: 0.5;
    }
  }

  .all-colors__list-item--details {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__btn {
      font-size: 2rem;
    }

    &__btn.edit {
      margin-left: auto;
      color: ${({ theme }) => theme.colors.blue};
    }

    &__btn.delete {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;
