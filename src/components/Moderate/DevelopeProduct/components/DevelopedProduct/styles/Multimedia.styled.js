import styled from "styled-components";

export const MultimediaDualBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;

  .multimedia-title {
    font-weight: 600;
  }

  .multimedia-content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export const MultimediaBox = styled.figure`
  width: 100%;
  width: 20rem;
  height: 20rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.radial_sm_dark};
  background: ${({ theme }) => theme.colors.white};

  video,
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;
