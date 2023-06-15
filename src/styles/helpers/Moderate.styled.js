import { css } from "styled-components";

const moderateContentBox = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 3rem 1rem 3rem;
  height: 100%;

  .moderator-title {
    font-size: ${({ theme }) => theme.fontSize.h3};
    width: 100%;
    display: flex;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 30rem;
  }

  .picked-color {
    background: ${({ colorinhex }) =>
      colorinhex ? colorinhex : "transparent"};
    height: 4rem;
    width: 100%;
    border-radius: 0.5rem;
  }

  .form__file-icon--review {
    background: ${({ theme }) => theme.colors.gray_shade};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;

    &__fig {
      width: 3rem;
      height: 3rem;

      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
`;

export default moderateContentBox;
