import styled from "styled-components";

export const ToggleDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .show-details__btn {
    color: ${({ theme }) => theme.colors.blue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
    padding-bottom: 0.5rem;
  }
`;
