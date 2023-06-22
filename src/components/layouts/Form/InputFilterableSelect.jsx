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
  strictSelection = false,
}) {
  const [isTyping, setIsTyping] = useState(false);

  const { onFocus, removeListener } = useBlurOnBody(
    () => {
      setIsTyping(true);
    },
    () => {
      setValue({
        key: name,
        value: list.some((item) => item.caption.includes(value)) ? value : "",
      });
      setIsTyping(false);
    },
    ["form__input-field", "filterable_dropdown"]
  );

  function handleInput(e) {
    setValue({ key: name, value: e.target.value });
  }

  function handleDropdownItem(item) {
    setValue({ key: name, value: item });
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
        className="form__input-field"
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
        onFocus={onFocus}
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
                  className="filterable_dropdown-list--item"
                  key={item._id}
                  onClick={() => handleDropdownItem(item.caption)}
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
