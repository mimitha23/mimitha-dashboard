import styled from "styled-components";

export const ColorsList = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, max-content));
  gap: 3rem;
  justify-content: space-between;
`;

export const ColorsListItem = styled.li`
  border-bottom: 1px solid ${({ hex }) => hex};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.75rem;

  .all-colors--list__item-pattern {
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

  .all-colors--list__item-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  }
`;