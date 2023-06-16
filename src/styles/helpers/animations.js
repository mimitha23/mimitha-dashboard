import { css } from "styled-components";

export const animateMoveBottom = ({ diff = "-1rem", duration = "0.2s" }) => css`
  animation: moveBottom ${duration} none;

  @keyframes moveBottom {
    0% {
      transform: translateY(${diff});
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const animateMoveTop = ({ diff = "1rem", duration = "0.2s" }) => css`
  animation: moveTop ${duration} none;

  @keyframes moveTop {
    0% {
      transform: translateY(${diff});
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const animateMoveRight = ({ diff = "-1rem", duration = "0.2s" }) => css`
  animation: moveRight ${duration} none;

  @keyframes moveRight {
    0% {
      transform: translateX(${diff});
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const animateMoveLeft = ({ diff = "1rem", duration = "0.2s" }) => css`
  animation: moveLeft ${duration} none;

  @keyframes moveLeft {
    0% {
      transform: translateX(${diff});
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const animatePopUpAndScale = ({ duration = "0.2s" }) => css`
  animation: popUpAndScale ${duration} ease none;

  @keyframes popUpAndScale {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
