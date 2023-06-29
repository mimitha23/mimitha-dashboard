import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { CloseXIcon, OpenIcon } from "components/layouts/Icons";
import * as Styled from "./styles/AddVariantField.styled";

const variants = [
  {
    _id: nanoid(),
    type: "pocket",
    label: "pocket left",
  },
  {
    _id: nanoid(),
    type: "pocket",
    label: "pocket right",
  },
  {
    _id: nanoid(),
    type: "pocket",
    label: "pocket top",
  },
  {
    _id: nanoid(),
    type: "pocket",
    label: "pocket bottom",
  },
  {
    _id: nanoid(),
    type: "zipper",
    label: "with zipper",
  },
  {
    _id: nanoid(),
    type: "zipper",
    label: "without zipper",
  },
  {
    _id: nanoid(),
    type: "cuff",
    label: "with cuff",
  },
  {
    _id: nanoid(),
    type: "cuff",
    label: "without cuff",
  },
  {
    _id: nanoid(),
    type: "pocket",
    label: "pocket left",
  },
  {
    _id: nanoid(),
    type: "pocket",
    label: "pocket left",
  },
];

export default function AddVariantField() {
  const [openDropdownBox, setOpenDropdownBox] = useState(false);
  const [filteredDropdown, setFilteredDropdown] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  function handleSearch(e) {
    setUserSearch(e.target.value);

    if (!openDropdownBox) setOpenDropdownBox(true);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredDropdown(
        variants.filter((vr) =>
          userSearch === ""
            ? vr
            : vr.label.includes(userSearch) || vr.type.includes(userSearch)
        )
      );
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userSearch]);

  return (
    <Styled.AddVariantField>
      <ul className="selected-variants__list">
        <li className="selected-variants__item">
          <span className="selected-variants__item-type">Pocket</span>
          <span className="selected-variants__item-label">pocket left</span>
          <button className="selected-variants__item-close--btn">
            <CloseXIcon />
          </button>
        </li>
      </ul>

      <input
        className="add-variant__btn"
        placeholder="add variant"
        value={userSearch}
        onChange={handleSearch}
      />

      {openDropdownBox && userSearch && (
        <div className="select-variant__dropdown">
          <div className="select-variant__dropdown-header">
            <button className="select-variant__dropdown-header__expand-btn">
              <OpenIcon />
            </button>
          </div>

          <ul className="select-variant__dropdown-list">
            {filteredDropdown.map((vr) => (
              <li key={vr._id} className="select-variant__dropdown-list--item">
                <span>{vr.type}</span>
                <span>{vr.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Styled.AddVariantField>
  );
}
