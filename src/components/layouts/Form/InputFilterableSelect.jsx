/* eslint-disable react-hooks/exhaustive-deps */
import { useState, memo } from "react";

import * as Styled from "./Form.styled";
import { useClickOutside } from "hooks/utils";

export default memo(function InputFilterableSelect({
  id,
  label,
  name,
  placeholder,
  anotation,
  readOnly = false,
  value,
  setValue,
  selectValue,
  error,
  message,
  list = [],
  selectedList,
  strictSelection = true,
}) {
  const [isTyping, setIsTyping] = useState(false);

  function handleDropdownItem(item) {
    setIsTyping(false);
    selectValue({ key: name, value: item });
  }
  const dropdown_ref = useClickOutside(isTyping, () => {
    let valueToAssign = null;

    const existingValue = list.find((item) => item.caption === value);
    if (!strictSelection && value && existingValue)
      valueToAssign = existingValue;
    if (!strictSelection && value && !existingValue)
      valueToAssign = { caption: value };

    // !value && selectValue({ key: name, value: valueToAssign });
    selectValue({ key: name, value: valueToAssign });
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
        type="text"
        name={name}
        className={`form__input-field  ${error ? "error" : ""}`}
        placeholder={placeholder}
        onChange={(e) => setValue({ key: name, value: e.target.value })}
        value={value}
        onFocus={() => setIsTyping(true)}
        readOnly={readOnly}
      />

      {isTyping && (
        <div className="filterable_dropdown">
          <ul className="filterable_dropdown-list">
            {list
              .filter((item) =>
                value === "" || readOnly ? item : item.caption.includes(value)
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
                  } ${item.caption === value ? "active" : ""}`}
                  onClick={() => handleDropdownItem(item)}
                >
                  {item.caption}
                </li>
              ))}
          </ul>
        </div>
      )}

      {anotation && <blockquote>{anotation}</blockquote>}

      {error && <p>{message}</p>}
    </Styled.InputFilterableSelect>
  );
});
