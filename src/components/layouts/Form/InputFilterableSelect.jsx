import { useState } from "react";
import * as Styled from "./Form.styled";

export default function InputFilterableSelect({
  id,
  label,
  name,
  placeholder,
  anotation,
  error,
  message,
  readOnly = false,
}) {
  const [userValue, setUserValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const variants = [
    "pocket",
    "zipper",
    "cuff",
    "bootstrap",
    "button",
    "collar",
    "wrist",
  ];

  function handleInput(e) {
    setUserValue(e.target.value);
  }

  function handleDropdownItem(item) {
    setUserValue(item);
    setIsTyping(false);
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
        value={userValue}
        onFocus={() => setIsTyping(true)}
        readOnly={readOnly}
      />

      {isTyping && (
        <div className="filterable_dropdown">
          <ul className="filterable_dropdown-list">
            {variants
              .filter((item) =>
                userValue === "" || readOnly ? item : item.includes(userValue)
              )
              .map((item) => (
                <li
                  className="filterable_dropdown-list--item"
                  key={item}
                  onClick={() => handleDropdownItem(item)}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.InputFilterableSelect>
  );
}
