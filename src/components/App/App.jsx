import styled from "styled-components";
import AsideNavigation from "./AsideNavigation/AsideNavigation";

export const AppContainer = styled.main`
  display: flex;

  .app__content-box {
    width: 100%;
    padding: 1rem;
  }
`;

export default function App({ children }) {
  return (
    <AppContainer>
      <AsideNavigation />
      <section className="app__content-box">{children}</section>
    </AppContainer>
  );
}
