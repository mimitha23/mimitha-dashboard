import styled from "styled-components";

export const LoadingSpinner = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.black_tr_08};
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
