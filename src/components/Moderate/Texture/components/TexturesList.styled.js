import styled from "styled-components";

export const TexturesList = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, max-content));
  gap: 3rem;
  justify-content: space-between;

  .all-textures--list__item-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    border-radius: 0.5rem;

    &__label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    [data-edit-and-delete-buttons] {
      margin-top: auto;

      button.edit {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
