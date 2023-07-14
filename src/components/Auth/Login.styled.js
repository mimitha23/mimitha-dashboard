import styled from "styled-components";

export const Login = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30rem;
  }

  .password-field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.white};

    input {
      outline: none;
      border: none;
    }

    button {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.dark_gray};
    }
  }
`;
