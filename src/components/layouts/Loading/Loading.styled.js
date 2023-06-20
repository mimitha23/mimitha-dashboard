import styled, { keyframes } from "styled-components";

const ride_gradient = keyframes`
  0% {
    background-position: 0% 50%;
  } 100%{
    background-position: -200% 50%;
  }
  `;

const jumping_dot = keyframes`
  0% {
    transform:translateY(0);
  } 50%{
    transform: translateY(-3px);
  } 100% {
    transform: translateY(0);
  }
`;

export const Loading = styled.div`
  .loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 4rem;
    background: blue;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.blue} 30%,
      transparent
    );
    background-size: 150%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: ${ride_gradient} 2s linear infinite;

    .dot {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.blue};
      animation: ${jumping_dot} 1s linear infinite;

      &-1 {
        animation-delay: 0s;
      }
      &-2 {
        animation-delay: 0.33s;
      }
      &-3 {
        animation-delay: 0.66s;
      }
    }
  }
`;
