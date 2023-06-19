import { NavLink } from "react-router-dom";
import { MODERATE_SIDEBAR_ROUTES } from "config/routes";
import * as Styled from "./styles/ModerateNavigation.styled";

export default function ModerateNavigation() {
  return (
    <Styled.ModerateNavigation>
      <nav className="moderate-nav">
        <ul className="moderate-nav__list">
          {MODERATE_SIDEBAR_ROUTES.map((route) => (
            <li className="moderate-nav__list-item" key={route._id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav--link__active" : ""
                }
                to={route.path.relativePath}
              >
                {route.caption}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </Styled.ModerateNavigation>
  );
}
