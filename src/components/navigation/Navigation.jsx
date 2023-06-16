import { NavLink } from "react-router-dom";
import * as Styled from "./Navigation.styled";
import { MAIN_NAV_ROUTES } from "config/routes";

import SwithTheme from "./SwithTheme";

export default function Navigation() {
  return (
    <Styled.Navigation>
      <ul className="main-nav__list">
        {MAIN_NAV_ROUTES.map((route) => (
          <li key={route._id}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav--link__active" : ""
              }
              to={route.path}
            >
              {route.caption}
            </NavLink>
          </li>
        ))}
      </ul>

      <SwithTheme />
    </Styled.Navigation>
  );
}
