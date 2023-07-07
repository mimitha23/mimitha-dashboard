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
  error,
  message,
  list = [],
  strictSelection = true,
}) {
  const [isTyping, setIsTyping] = useState(false);

  const random_field_id = `${name}-filterable-field`;
  const random_dropdown_id = `${name}-filterable-dropdown`;

  const { onFocus, removeListener } = useBlurOnBody(
    () => {
      setIsTyping(true);
    },
    () => {
      strictSelection && setValue({ key: name, value: "" });
      setIsTyping(false);
    },
    [random_field_id, random_dropdown_id]
  );

  function handleDropdownItem({ key, item }) {
    setValue({ key, value: item._id, strict: true });
    setIsTyping(false);
    removeListener();
  }

  return (
    <Styled.InputFilterableSelect>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type="text"
        name={name}
        className={`form__input-field ${random_field_id}`}
        placeholder={placeholder}
        onChange={(e) =>
          setValue({ key: e.target.name, value: e.target.value, strict: false })
        }
        value={value}
        onFocus={onFocus}
        readOnly={readOnly}
      />

      {isTyping && (
        <div className={`filterable_dropdown ${random_dropdown_id}`}>
          <ul className="filterable_dropdown-list">
            {list
              .filter((item) =>
                value === "" || readOnly ? item : item.caption.includes(value)
              )
              .map((item) => (
                <li
                  className="filterable_dropdown-list--item"
                  key={item._id}
                  onClick={() => handleDropdownItem({ key: name, item })}
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
