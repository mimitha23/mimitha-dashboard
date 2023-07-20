import NavRouteDropdown from "./components/NavRouteDropdown";
import * as Styled from "./styles/AsideNavigation.styled";

export default function AsideNavigation() {
  return (
    <Styled.AsideNavigation>
      <nav className="app__main-nav">
        <ul className="app__main-nav--list">
          <NavRouteDropdown />
        </ul>
      </nav>
    </Styled.AsideNavigation>
  );
}
