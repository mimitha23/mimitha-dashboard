import styled from "styled-components";

export const FormHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .moderate-header__title {
    font-size: ${({ theme }) => theme.fontSize.h3};
  }

  .moderate-header__link {
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: underline;
  }
`;
