import { css } from "styled-components";

const dropdownRectingle = ({
  buttonWidth,
  buttonBorderWidth,
  rectingleHeight,
  rectingleBorderWidth = "2px",
}) => {
  return css`
    position: relative;
    z-index: 2;
    width: calc(${buttonWidth} - ${rectingleHeight} / 2);
    height: ${rectingleHeight};

    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: -${buttonBorderWidth};
      right: 0;
      transform: translateX(calc(50% - ${rectingleBorderWidth} * 2));
      height: 0;
      width: 0;
      border-top: calc(${rectingleHeight} + 0.1rem) solid
        ${({ theme }) => theme.colors.text};
      border-left: ${rectingleHeight} solid transparent;
      border-right: ${rectingleHeight} solid transparent;
    }

    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      top: calc(${buttonBorderWidth} / 2);
      right: 0;
      transform: translateX(calc(50% - ${rectingleBorderWidth} * 2));
      height: 0;
      width: 0;
      border-top: calc(${rectingleHeight} - 4 * ${rectingleBorderWidth}) solid
        ${({ theme }) => theme.colors.bg};
      border-left: calc(${rectingleHeight} - 4 * ${rectingleBorderWidth}) solid
        transparent;
      border-right: calc(${rectingleHeight} - 4 * ${rectingleBorderWidth}) solid
        transparent;
      transition: all 0.2s ease;
    }

    &.active-dropdown::before {
      border-top: calc(${rectingleHeight} - 4 * ${rectingleBorderWidth}) solid
        ${({ theme }) => theme.colors.text};
    }
  `;
};

export default dropdownRectingle;
