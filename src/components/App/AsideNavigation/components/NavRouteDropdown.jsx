import { useState } from "react";
import { NavLink } from "react-router-dom";

import { PATHS } from "config/routes";

import { ArrowBottomIcon } from "components/layouts/Icons";
import * as Styled from "./styles/NavRouteDropdown.styled";

export default function NavRouteDropdown(props) {
  const [activeNavDropdown, setActiveNavDropdown] = useState(false);

  return (
    <Styled.NavRouteDropdown className="app__main-nav--list__item">
      <button
        className={`nav-dropdown__btn ${activeNavDropdown ? "active" : ""}`}
        onClick={() => setActiveNavDropdown((prev) => !prev)}
      >
        <span>ნავიგაცია</span>
        <span>
          <ArrowBottomIcon />
        </span>
      </button>

      {activeNavDropdown && (
        <ul className="nav-dropdown__list">
          <li>
            <NavLink to={PATHS.app_sidebar.createNavRoutePage.relativePath}>
              დაამატე ნავიგაციის კურსი
            </NavLink>
          </li>
          <li>
            <NavLink to={PATHS.app_sidebar.editNavPage.relativePath}>
              დაარედაქტირე ნავიგაცია
            </NavLink>
          </li>
        </ul>
      )}
    </Styled.NavRouteDropdown>
  );
}
