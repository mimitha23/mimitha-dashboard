import styled, { keyframes } from "styled-components";

const animate_spin = keyframes`
  to{
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  position: ${({ position }) => position};
  inset: 0;
  background: ${({ theme }) => theme.colors.black_tr_05};
  display: flex;
  justify-content: center;
  align-items: center;

  .spin {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    border: 4px solid ${({ theme }) => theme.colors.blue};
    border-left-color: ${({ theme }) => theme.colors.gray_shade};
    animation: 1s ${animate_spin} linear infinite;
  }
`;
