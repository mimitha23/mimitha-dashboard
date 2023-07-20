import styled from "styled-components";

export const AllNavRoutes = styled.section`
  position: relative;

  .routes-list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, max-content));
    gap: 3rem;
    justify-content: space-between;

    &__item {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding-bottom: 0.75rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};

      &-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      [data-edit-and-delete-buttons] button:first-child {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
