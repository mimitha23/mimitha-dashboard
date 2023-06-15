import * as Styled from "./styles/ModerateContainer.styled";
import ModerateNavigation from "./ModerateNavigation";

export default function ModerateContainer({ children }) {
  return (
    <Styled.ModerateContainer>
      <ModerateNavigation />
      <section className="moderate-container__content-box">{children}</section>
    </Styled.ModerateContainer>
  );
}
