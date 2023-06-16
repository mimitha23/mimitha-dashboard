import { useState } from "react";

import { useFilter } from "hooks/layoutBase";
// import { selectFilters } from "store/selectors/filterSelectors";
import { filter } from "lib";

import Dropdown from "./Dropdown";
import FilterToggle from "./FilterToggle";
import * as Styled from "./styles/Filter.styled";

export default function Filter() {
  const { activeFilterDropdown, activateFilter } = useFilter();
  // const { productType, season, style, texture } = useSelector(selectFilters);

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Styled.FilterContainer
      className={openFilter ? "visible_filter" : "hidden_filter"}
    >
      <FilterToggle openFilter={openFilter} setOpenFilter={setOpenFilter} />

      <div className="filter-dropdowns__wrapper" data-filter-container>
        <Dropdown
          dropdownType="SORT"
          activateFilter={activateFilter}
          isActive={activeFilterDropdown === "SORT"}
          caption="დალაგება"
          data={filter.sort}
        />

        <Dropdown
          dropdownType="PRODUCT_TYPE"
          activateFilter={activateFilter}
          isActive={activeFilterDropdown === "PRODUCT_TYPE"}
          caption="პროდუქტის ტიპი"
          data={filter.productType}
        />

        <Dropdown
          dropdownType="SEASON"
          activateFilter={activateFilter}
          isActive={activeFilterDropdown === "SEASON"}
          caption="სეზონი"
          data={filter.season}
        />

        <Dropdown
          dropdownType="TEXTURE"
          activateFilter={activateFilter}
          isActive={activeFilterDropdown === "TEXTURE"}
          caption="ტექსტურა"
          data={filter.texture}
        />

        <Dropdown
          dropdownType="STYLE"
          activateFilter={activateFilter}
          isActive={activeFilterDropdown === "STYLE"}
          caption="სტილი"
          data={filter.style}
        />
      </div>
    </Styled.FilterContainer>
  );
}
