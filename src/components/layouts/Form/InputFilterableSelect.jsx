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
  strictSelection = true,
}) {
  const [isTyping, setIsTyping] = useState(false);

  function handleDropdownItem(item) {
    setIsTyping(false);
    selectValue({ key: name, value: item });
  }

  const dropdown_ref = useClickOutside(isTyping, () => setIsTyping(false));

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
                  className="filterable_dropdown-list--item"
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
