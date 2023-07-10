/* eslint-disable react-hooks/exhaustive-deps */
import { useState, memo } from "react";
import * as Styled from "./Form.styled";
import { useBlurOnBody } from "hooks/utils";

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

  const random_field_id = `${name}-filterable-field`;
  const random_dropdown_id = `${name}-filterable-dropdown`;

  const { onFocus, removeListener, blur } = useBlurOnBody(
    () => {
      setIsTyping(true);
    },
    () => {
      strictSelection && selectValue({ key: name, value: null });
      setIsTyping(false);
    },
    [random_field_id, random_dropdown_id]
  );

  function handleDropdownItem(item) {
    removeListener();
    setIsTyping(false);
    selectValue({ key: name, value: item });
  }

  return (
    <Styled.InputFilterableSelect>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        type="text"
        name={name}
        className={`form__input-field ${random_field_id} ${
          error ? "error" : ""
        }`}
        placeholder={placeholder}
        onChange={(e) => setValue({ key: name, value: e.target.value })}
        value={value}
        onFocus={onFocus}
        readOnly={readOnly}
      />

      {isTyping && !blur && (
        <div className={`filterable_dropdown ${random_dropdown_id}`}>
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
