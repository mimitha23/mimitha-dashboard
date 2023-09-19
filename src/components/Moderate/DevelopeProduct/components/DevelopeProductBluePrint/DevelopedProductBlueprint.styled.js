import styled from "styled-components";
import { scrollbar } from "styles/helpers";
import { errMessageStyles } from "styles/helpers/Form.styled";

export const DevelopedProductBlueprint = styled.div`
  position: sticky;
  top: calc(${({ theme }) => theme.app.nav_h} + 1rem);
  flex: 1;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: ${({ theme }) =>
    theme.mode === "DARK" ? theme.colors.text : theme.colors.gray_shade};
  color: ${({ theme }) => theme.colors.dark_gray};
  max-height: calc(100vh - 4rem - ${({ theme }) => theme.app.nav_h});
  overflow: auto;
  ${scrollbar};
  padding: 1rem;
  border-radius: 0.5rem;

  .product__media-box--title {
    font-weight: 600;
  }

  .is-empty-part {
    opacity: 0.5;
  }

  .registered-product--card__details {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    .registered-product--card__details-box {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0.5rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;

      &:hover {
        background: ${({ theme }) => theme.colors.blue};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const ImageFilesReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: max-content;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray_shade};

  .images-review__list {
    width: 100%;
    min-height: 15rem;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, 12rem);
    grid-template-rows: auto;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px dashed ${({ theme }) => theme.colors.gray_shade};
  }

  .add-developed--product__assets-item {
    width: 100%;
    height: 12rem;
    border: 1px solid ${({ theme }) => theme.colors.gray_shade};
    background: ${({ theme }) => theme.colors.white};
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .remove-asset__btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      border-radius: 100%;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({ theme }) => theme.colors.black_tr_05};
      color: ${({ theme }) => theme.colors.white};
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    &:hover .remove-asset__btn {
      opacity: 1;
      pointer-events: all;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .product__media-box__label {
    justify-self: center;
    width: 100%;
    min-width: 100%;
    height: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    text-wrap: balance;
    opacity: 0.5;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.sm};
    border: 1px dashed ${({ theme }) => theme.colors.gray_shade};
    cursor: pointer;
    transition: all 0.2s ease;

    &.empty {
      grid-column: span 5;
      border: none;
      height: 100%;
      flex-direction: row;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.blue};
      opacity: 1;
    }

    svg {
      margin-top: 0.2rem;
    }

    span {
      line-height: 1.4;
    }
  }

  .assets-review__err-msg {
    grid-row: 2;
    grid-column: span 2;
    ${errMessageStyles};
  }
`;

export const MediaDualBox = styled.div`
  [data-dual-box-container].product__thumbnails {
    display: grid;
    grid-template-columns: repeat(2, 20rem);
    grid-template-rows: repeat(2, max-content);

    .dual-box__err-msg {
      grid-row: 2;
      grid-column: span 2;
      ${errMessageStyles};
    }
  }
`;

export const MediaDualBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0;
  border: 1px solid gray;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray_shade};

  .product__thumbnails {
    display: flex;
    gap: 2rem;
  }
`;

export const MediaBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  figure {
    width: 20rem;
    height: 20rem;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: 1px dashed ${({ theme }) => theme.colors.gray_shade};

    .video_frame {
      aspect-ratio: 16/9;
    }

    p {
      font-weight: 600;
      font-size: 12px;
    }

    video,
    img {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .media-box__err-msg {
    ${errMessageStyles};
  }

  .dual-box__file-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.5;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.blue};
      opacity: 1;
    }
  }
`;
