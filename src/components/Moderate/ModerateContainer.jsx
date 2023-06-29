import styled from "styled-components";
import ModerateNavigation from "./components/ModerateNavigation";

export const ModerateContainerEl = styled.main`
  display: flex;

  .moderate-container__content-box {
    width: 100%;
  }
`;

export default function ModerateContainer({ children }) {
  return (
    <ModerateContainerEl>
      <ModerateNavigation />
      <section className="moderate-container__content-box">{children}</section>
    </ModerateContainerEl>
  );
}
