import { createGlobalStyle } from "styled-components";

export const AppStyles = createGlobalStyle`
  *,
  *::after,
  *::before{
    padding:0;
    margin:0;
  }

  html{
    font-size: 62.5%;
  }

  body{
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
  }
`;
