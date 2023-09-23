import styled from "styled-components";

export const EditNav = styled.form`
  .edit-nav__list {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-item {
      display: flex;
      flex-direction: column;

      &__category {
        text-transform: capitalize;
      }

      .add-category__btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-left: 2rem;
        margin-top: 2.5rem;
        padding: 1rem;
        width: max-content;
        border-radius: 0.5rem;
        background: ${({ theme }) => theme.colors.blue};
        color: ${({ theme }) => theme.colors.white};

        span:last-child {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .edit-nav__blocks-list {
    margin-left: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__item {
      position: relative;
      width: max-content;

      & > .control-list--buttons__box {
        opacity: 0;
        pointer-events: none;
      }

      &:has(.edit-nav__blocks-list__item-title--box:hover)
        > .control-list--buttons__box,
      .control-list--buttons__box:hover {
        opacity: 1;
        pointer-events: auto;
      }
    }

    &__item .edit-nav__blocks-list__item-title--box {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .edit-nav__blocks-list__item-title {
        display: flex;
        align-items: center;
      }

      .edit-nav__blocks-list__item-title input {
        border-bottom: 1px solid
          ${({ theme }) =>
            theme.mode === "DARK"
              ? theme.colors.gray_tint
              : theme.colors.dark_gray};
        transform: translateY(0.1rem);
        outline: none;
        background: transparent;
        color: ${({ theme }) => theme.colors.text};
        padding: 1rem 1rem 0.75rem 0.5rem;

        &::placeholder {
          opacity: 0.3;
          color: ${({ theme }) => theme.colors.text};
          font-size: ${({ theme }) => theme.fontSize.md};
        }
      }
    }
  }

  .routes-box {
    margin-left: 2rem;
    margin-top: 1.75rem;

    .toggle-routes__btn {
      display: flex;
      align-items: center;
      gap: 4rem;
    }

    &__list {
      margin-top: 1.5rem;
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      &-item {
        width: 34rem;
        display: flex;
        align-items: center;
        position: relative;

        & > .control-list--buttons__box {
          opacity: 0;
          pointer-events: none;
        }

        &:hover > .control-list--buttons__box,
        .control-list--buttons__box:hover {
          opacity: 1;
          pointer-events: auto;
          right: 0;
        }
      }

      &-item [data-input-filtrable-select] input {
        border: none;
        padding-bottom: 0.2rem;
        height: auto;
        background: transparent;
        outline: none;
        color: ${({ theme }) => theme.colors.text};
      }
    }
  }

  .control-list--buttons__box {
    position: absolute;
    z-index: 9;
    top: -0.75rem;
    right: -3.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .add-after__btn,
    .remove__btn {
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }) =>
        theme.mode === "DARK"
          ? theme.colors.gray_tint
          : theme.colors.black_tr_02};
      color: ${({ theme }) =>
        theme.mode === "DARK" ? theme.colors.dark_gray : theme.colors.white};
    }
  }

  .button-primary {
    width: 38rem;
    margin-top: 4rem;
  }
`;
