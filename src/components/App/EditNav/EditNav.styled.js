import styled from "styled-components";

export const EditNav = styled.div`
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
      gap: 1rem;

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
        padding-bottom: 0.25rem;
        transform: translateY(0.15rem);
        outline: none;
        background: transparent;
        color: ${({ theme }) => theme.colors.text};

        &::placeholder {
          opacity: 0.3;
          color: ${({ theme }) => theme.colors.text};
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
        transform: translateY(-0.2rem);
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
`;
