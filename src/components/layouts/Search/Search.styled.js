import styled from "styled-components";

export const Search = styled.div`
  height: 3rem;
  width: 25rem;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};

  .moderate-search--icon {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.dark_gray};
  }

  .moderate-search--input {
    height: 100%;
    width: 100%;
    padding: 0 1rem;
    outline: none;

    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
`;
