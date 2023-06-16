import { css } from "styled-components";

const scrollbar = ({
  width = "1rem",
  marginBlockTop = "0",
  marginBlockBottom = "0",
}) => css`
  &::-webkit-scrollbar {
    width: ${width};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray_shade};
    border-radius: 1rem;
    margin-block-start: ${marginBlockTop};
    margin-block-end: ${marginBlockBottom};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.mode === "DARK" ? theme.colors.dark_gray : theme.colors.text};
    border-radius: 1rem;
  }
`;

export default scrollbar;
