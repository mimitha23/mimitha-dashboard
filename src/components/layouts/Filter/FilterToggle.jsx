import { FilterIcon, FilterOffIcon } from "../Icons";
import * as Styled from "./styles/FilterToggle.styled";

export default function FilterToggle({ openFilter, setOpenFilter }) {
  return (
    <Styled.FilterToggle className="filter__expand-box" data-toggle-filter>
      <button
        className={`toggle-filter__btn ${openFilter ? "hide-btn" : "show-btn"}`}
        onClick={() => setOpenFilter((prev) => !prev)}
      >
        {openFilter ? (
          <>
            <span>დამალეთ ფილტრი</span>
            <span>
              <FilterOffIcon />
            </span>
          </>
        ) : (
          <>
            <span>ფილტრის ჩვენება</span>
            <span>
              <FilterIcon />
            </span>
          </>
        )}
      </button>
    </Styled.FilterToggle>
  );
}
