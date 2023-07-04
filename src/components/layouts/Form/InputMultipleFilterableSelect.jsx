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
  strictSelection = true,
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");

  const random_field_id = `${name}-multiple-filterable-field`;
  const random_dropdown_id = `${name}-multiple-filterable-dropdown`;

  const { onFocus } = useBlurOnBody(
    () => {
      setIsTyping(true);
    },
    () => {
      setIsTyping(false);
      setEnteredValue("");
    },
    [random_field_id, random_dropdown_id]
  );

  function handleOnSelect({ key, value }) {
    selectField({ key, value });
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
        className={`form__input-field ${random_field_id}`}
        placeholder={placeholder}
        onChange={(e) => setEnteredValue(e.target.value)}
        value={enteredValue}
        onFocus={onFocus}
        readOnly={readOnly}
      />

      {selectedFields[0] && (
        <ul className="selected-fields">
          {selectedFields.map((field) => (
            <li key={nanoid()} className="selected-fields--item">
              <span>{field.caption}</span>
              <button
                onClick={() =>
                  handleOnCloseSelected({ key: name, value: field._id })
                }
              >
                <CloseXIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

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
                  className={`filterable_dropdown-list--item ${
                    selectedFields.some((field) => field._id === item._id)
                      ? "selected-field"
                      : ""
                  }`}
                  key={item._id}
                  onClick={() => handleOnSelect({ key: name, value: item._id })}
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
