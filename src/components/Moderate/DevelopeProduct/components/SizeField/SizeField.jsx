import { Controller } from "react-hook-form";
import * as Form from "components/layouts/Form";
import * as Styled from "./SizeField.styled";

export default function SizeField({ sizeField, form, sizeSuggestions }) {
  return (
    <Styled.SizeField>
      <Form.DynamicFieldHeader
        label="ზომა"
        onAddField={() =>
          sizeField.append({
            amount: "",
            size: {
              ka: "",
              en: "",
              _id: "",
              caption: "",
            },
          })
        }
      />

      <Controller
        name="sizes"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <ul className="size-field__inputs-list">
            {sizeField.fields.map((fieldItem, index) => (
              <li className="size-field__inputs" key={fieldItem.id}>
                <Controller
                  control={form.control}
                  name={`sizes.${index}.size`}
                  defaultValue={fieldItem?.size?.caption}
                  render={({
                    field: childField,
                    fieldState: { error: childError },
                  }) => (
                    <Form.InputFilterableSelect
                      id="size"
                      placeholder="sm"
                      anotation="აირჩიე არსებული ზომა ან შექმენი ახალი"
                      list={sizeSuggestions}
                      selectValue={(size) => childField.onChange(size)}
                      error={childError ? true : false}
                      message={childError?.message}
                      inputValue={childField.value?.caption}
                      fieldProps={{
                        ...childField,
                        onChange: (e) =>
                          childField.onChange({
                            ...childField.value,
                            caption: e.target.value,
                          }),
                      }}
                    />
                  )}
                />

                <Controller
                  name={`sizes.${index}.amount`}
                  control={form.control}
                  defaultValue={fieldItem?.amount}
                  render={({
                    field: childField,
                    fieldState: { error: childError },
                  }) => (
                    <Form.InputText
                      type="number"
                      placeholder="1"
                      fieldProps={{
                        ...childField,
                        onChange: (e) => childField.onChange(+e.target.value),
                        min: 0,
                      }}
                      error={childError ? true : false}
                      message={childError?.message}
                    />
                  )}
                />

                {index > 0 && (
                  <Form.RemoveFieldButton
                    onRemove={() => sizeField.remove(index)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      />
    </Styled.SizeField>
  );
}
