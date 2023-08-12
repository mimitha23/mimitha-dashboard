import styled from "styled-components";

export const ErrorModal = styled.div`
  [data-modal] > div {
    box-shadow: ${({ theme }) => theme.shadow.radial_lg_dark};
  }

  .error-modal__window {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.red};
    min-width: 30rem;
    max-width: 44rem;
    text-align: center;
    text-wrap: balance;

    button {
      align-self: flex-end;
      background: ${({ theme }) => theme.colors.red};
      color: ${({ theme }) => theme.colors.white};
      padding: 1rem 3rem;
      border-radius: 0.5rem;
    }
  }
`;
