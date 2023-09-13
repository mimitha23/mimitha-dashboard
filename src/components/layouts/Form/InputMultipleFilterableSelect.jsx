import { useState, forwardRef } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useClickOutside } from "hooks/utils";

import { CloseXIcon } from "../Icons";
import * as Styled from "./styles/Form.styled";

function InputMultipleFilterableSelect(
  {
    id,
    label,
    placeholder,
    anotation,
    readOnly = false,
    list = [],
    selectedFields = [],
    selectField,
    error,
    message,
    fieldProps,
  },
  ref
) {
  const [isTyping, setIsTyping] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");

  const dropdown_ref = useClickOutside(isTyping, () => setIsTyping(false));

  function handleOnSelect(item) {
    selectField(item);
    enteredValue && setEnteredValue("");
  }

  return (
    <Styled.InputMultipleFilterableSelect
      ref={dropdown_ref}
      data-multiple-select-input
    >
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        ref={ref}
        type="text"
        value={enteredValue}
        {...fieldProps}
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={() => setIsTyping(true)}
        onChange={(e) => setEnteredValue(e.target.value)}
        className={`form__input-field  ${error ? "error" : ""}`}
      />

      {selectedFields[0] && (
        <SelectedFields
          selectedFields={selectedFields}
          handleOnSelect={handleOnSelect}
        />
      )}

      {isTyping && (
        <MultipleSelectDropdown
          list={list}
          readOnly={readOnly}
          enteredValue={enteredValue}
          selectedFields={selectedFields}
          handleOnSelect={handleOnSelect}
        />
      )}

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.InputMultipleFilterableSelect>
  );
}

export default forwardRef(InputMultipleFilterableSelect);

function SelectedFields({ selectedFields, handleOnSelect }) {
  return (
    <ul className="selected-fields">
      {selectedFields.map((field) => (
        <li key={nanoid()} className="selected-fields--item">
          <span>{field.caption}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOnSelect(field);
            }}
          >
            <CloseXIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

function MultipleSelectDropdown({
  list,
  readOnly,
  enteredValue,
  selectedFields,
  handleOnSelect,
}) {
  return (
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
              key={item._id}
              onClick={() => handleOnSelect(item)}
              className={`filterable_dropdown-list--item ${
                selectedFields.some((field) => field._id === item._id)
                  ? "selected-field"
                  : ""
              }`}
            >
              {item.caption}
            </li>
          ))}
      </ul>
    </div>
  );
}
