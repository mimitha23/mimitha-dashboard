import { NavLink } from "react-router-dom";
import * as Styled from "./Navigation.styled";
import { MAIN_NAV_ROUTES } from "config/routes";
import { useThemeContext } from "providers/ThemeProvider";

export default function Navigation() {
  const { changeTheme, currentThemeMode } = useThemeContext();

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

      <div>
        <button
          onClick={() =>
            changeTheme(currentThemeMode === "DARK" ? "LIGHT" : "DARK")
          }
        >
          toggle theme
        </button>
      </div>
    </Styled.Navigation>
  );
}
