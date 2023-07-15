import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useIsAuthenticated } from "hooks/auth";
import { MAIN_NAV_ROUTES } from "config/routes";
import { authActions } from "store/reducers/authReducer";

import { LogoutIcon } from "components/layouts/Icons";
import * as Styled from "./Navigation.styled";

import SwithTheme from "./SwithTheme";

export default function Navigation() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useIsAuthenticated(true);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return isAuthenticated ? (
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

      <div className="nav-actions__box">
        <SwithTheme />

        <button onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
    </Styled.Navigation>
  ) : (
    <></>
  );
}
