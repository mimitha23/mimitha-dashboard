import { createGlobalStyle } from "styled-components";
import { scrollbar } from "./helpers";

export const AppStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    padding:0;
    margin:0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
    ${scrollbar};
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: none;
  }

  ul {
    list-style: none;
  }

  body input{
    color:${({ theme }) => theme.colors.black}
  }

  a,
  input,
  button{
    color:inherit;
    font-size: inherit;
  }
  
  textarea,
  input,
  button{
    border:none;
  }
`;
