import styled from "styled-components";

export const CopyDevelopedProductConfig = styled.div`
  margin-bottom: 2rem;
  align-self: self-start;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2;
  align-items: center;
  gap: 2rem;

  .copy-config__choose-btn {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.sm};

    &.reset {
      grid-column: span 2;
    }
  }
`;