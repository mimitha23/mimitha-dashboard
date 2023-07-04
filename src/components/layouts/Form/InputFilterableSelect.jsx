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
  const [enteredValue, setEnteredValue] = useState(value);

  const random_field_id = `${name}-filterable-field`;
  const random_dropdown_id = `${name}-filterable-dropdown`;

  const { onFocus, removeListener } = useBlurOnBody(
    () => {
      setIsTyping(true);
    },
    () => {
      setEnteredValue("");
      setIsTyping(false);
    },
    [random_field_id, random_dropdown_id]
  );

  function handleDropdownItem({ key, item }) {
    setValue({ key, value: item._id });
    setEnteredValue(item.caption);
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
        onChange={(e) => setEnteredValue(e.target.value)}
        value={enteredValue}
        onFocus={onFocus}
        readOnly={readOnly}
      />

      {isTyping && (
        <div className={`filterable_dropdown ${random_dropdown_id}`}>
          <ul className="filterable_dropdown-list">
            {list
              .filter((item) =>
                enteredValue === "" || readOnly
                  ? item
                  : item.caption.includes(enteredValue)
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
