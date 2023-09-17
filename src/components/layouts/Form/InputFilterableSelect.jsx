/* eslint-disable react-hooks/exhaustive-deps */
import { useState, forwardRef } from "react";

import * as Styled from "./styles/Form.styled";
import { useClickOutside } from "hooks/utils";

function InputFilterableSelect(
  {
    id,
    label,
    placeholder,
    anotation,
    readOnly = false,
    selectValue,
    error,
    message,
    inputValue,
    list = [],
    selectedList,
    fieldProps,
  },
  ref
) {
  const [isTyping, setIsTyping] = useState(false);

  function handleDropdownItem(item) {
    setIsTyping(false);
    selectValue(item);
  }

  const dropdown_ref = useClickOutside(isTyping, () => {
    const existingValue = list.find((item) => item.caption === inputValue);

    if (inputValue && existingValue) selectValue(existingValue);

    setIsTyping(false);
  });

  return (
    <Styled.InputFilterableSelect
      ref={dropdown_ref}
      data-input-filtrable-select
    >
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        ref={ref}
        type="text"
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={() => setIsTyping(true)}
        {...fieldProps}
        value={inputValue}
        className={`form__input-field  ${error ? "error" : ""}`}
      />

      {isTyping && (
        <Dropdown
          list={list}
          readOnly={readOnly}
          inputValue={inputValue}
          selectedList={selectedList}
          handleDropdownItem={handleDropdownItem}
        />
      )}

      {anotation && <blockquote>{anotation}</blockquote>}

      {error && <p>{message}</p>}
    </Styled.InputFilterableSelect>
  );
}

export default forwardRef(InputFilterableSelect);

function Dropdown({
  list,
  readOnly,
  inputValue,
  selectedList,
  handleDropdownItem,
}) {
  return (
    <div className="filterable_dropdown">
      <ul className="filterable_dropdown-list">
        {list
          .filter((item) =>
            inputValue === "" || readOnly
              ? item
              : item.caption.includes(inputValue)
          )
          .map((item) => (
            <li
              key={item._id}
              className={`filterable_dropdown-list--item ${
                selectedList &&
                Array.isArray(selectedList) &&
                selectedList.some(
                  (selectedItem) => selectedItem._id === item._id
                )
                  ? "active"
                  : ""
              } ${item.caption === inputValue ? "active" : ""}`}
              onMouseDown={() => handleDropdownItem(item)}
            >
              {item.caption}
            </li>
          ))}
      </ul>
    </div>
  );
}
