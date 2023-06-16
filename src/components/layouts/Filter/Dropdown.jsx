import * as Styled from "./styles/Dropdown.styled";

export default function Dropdown({
  dropdownType,
  activateFilter,
  isActive,
  data,
  caption,
}) {
  return (
    <Styled.Dropdown data-filter-dropdown>
      <button
        onClick={() => activateFilter({ filterType: dropdownType })}
        className={`filter-dropdown__trigger-btn ${
          isActive ? "active-dropdown" : ""
        }`}
      >
        {caption}
      </button>

      {isActive && (
        <ul className="filter-dropdown__body">
          {data?.map((filter) => (
            <li key={filter.query} className="filter-dropdown__list-item">
              <button>{filter.label}</button>
            </li>
          ))}
        </ul>
      )}
    </Styled.Dropdown>
  );
}
