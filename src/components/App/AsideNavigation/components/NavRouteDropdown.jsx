import { NavLink } from "react-router-dom";
import { PATHS } from "config/routes";

import * as Styled from "./styles/NavRouteDropdown.styled";

export default function NavRouteDropdown() {
  return (
    <Styled.NavRouteDropdown className="app__main-nav--list__item">
      <NavLink to={PATHS.app_sidebar.editNavPage.relativePath}>
        დაარედაქტირე ნავიგაცია
      </NavLink>
    </Styled.NavRouteDropdown>
  );
}
