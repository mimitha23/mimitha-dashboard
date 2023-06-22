import { useState, memo } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useBlurOnBody } from "hooks/utils";

import { CloseXIcon } from "../Icons";
import * as Styled from "./Form.styled";

export default memo(function InputMultipleFilterableSelect({
  id,
  label,
  name,
  placeholder,
  anotation,
  readOnly = false,
  selectedFields = [],
  selectField,
  error,
  message,
  list = [],
  strictSelection = false,
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");

  const { onFocus } = useBlurOnBody(handleOnFocus, handleOnBlur, [
    "form__input-field",
    "filterable_dropdown",
  ]);

  function handleOnFocus() {
    setIsTyping(true);
  }

  function handleOnBlur() {
    setIsTyping(false);
    enteredValue &&
      selectField(
        list.some((item) => item.caption.includes(enteredValue))
          ? enteredValue
          : ""
      );
  }

  function handleOnChange(e) {
    setEnteredValue(e.target.value);
  }

  function handleOnSelect(item) {
    selectField(item);
    enteredValue && setEnteredValue("");
  }

  function handleOnCloseSelected(item) {
    selectField(item);
  }

  return (
    <Styled.InputMultipleFilterableSelect>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type="text"
        name={name}
        className="form__input-field"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={enteredValue}
        onFocus={onFocus}
        readOnly={readOnly}
      />

      {selectedFields[0] && (
        <ul className="selected-fields">
          {selectedFields.map((field) => (
            <li key={nanoid()} className="selected-fields--item">
              <span>{field}</span>
              <button onClick={() => handleOnCloseSelected(field)}>
                <CloseXIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      {isTyping && (
        <div className="filterable_dropdown">
          <ul className="filterable_dropdown-list">
            {list
              .filter((item) =>
                enteredValue === "" || readOnly
                  ? item
                  : item.caption.includes(enteredValue)
              )
              .map((item) => (
                <li
                  className={`filterable_dropdown-list--item ${
                    selectedFields.includes(item.caption)
                      ? "selected-field"
                      : ""
                  }`}
                  key={item._id}
                  onClick={() => handleOnSelect(item.caption)}
                >
                  {item.caption}
                </li>
              ))}
          </ul>
        </div>
      )}

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.InputMultipleFilterableSelect>
  );
});
