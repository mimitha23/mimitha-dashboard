import { useSelector } from "react-redux";

import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";

import { Controller } from "react-hook-form";

import TextureFieldHeader from "./TextureFieldHeader";
import * as Styled from "./styles/TextureField.styled";
import * as Form from "components/layouts/Form";

export default function TextureField({ textureField, form }) {
  const { textures: textureSuggestions } = useSelector(
    registerProductSelectors.selectRegisterProductFormSuggestions
  );

  return (
    <Styled.TextureField>
      <TextureFieldHeader
        onAddField={() =>
          textureField.append({
            percentage: "",
            texture: {
              ka: "",
              en: "",
              _id: "",
              caption: "",
            },
          })
        }
      />

      <Controller
        name="textures"
        control={form.control}
        render={() => (
          <ul className="texture-field__list">
            {textureField.fields.map((fieldItem, index) => (
              <li className="texture-field__list-item" key={fieldItem.id}>
                <Controller
                  name={`textures.${index}.texture`}
                  control={form.control}
                  defaultValue={fieldItem.texture.caption}
                  render={({ field, fieldState: { error } }) => (
                    <Form.InputFilterableSelect
                      id={`texture-${index}`}
                      placeholder="აირჩიეთ ტექსტურა"
                      list={textureSuggestions}
                      selectValue={(texture) => field.onChange(texture)}
                      error={error ? true : false}
                      message={error?.message}
                      inputValue={field.value?.caption}
                      fieldProps={{
                        ...field,
                        onChange: (e) =>
                          field.onChange({
                            ...field.value,
                            caption: e.target.value,
                          }),
                      }}
                    />
                  )}
                />

                <Controller
                  name={`textures.${index}.percentage`}
                  control={form.control}
                  defaultValue={fieldItem.texture.percentage}
                  render={({ field, fieldState: { error } }) => (
                    <PercentageField
                      fieldProps={field}
                      error={error ? true : false}
                      message={error?.message}
                    />
                  )}
                />

                {index > 0 && (
                  <Form.RemoveFieldButton
                    onRemove={() => textureField.remove(index)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      />

      {/* {error.hasError && error.message && <p>{error.message}</p>} */}
    </Styled.TextureField>
  );
}

function PercentageField({ fieldProps, error, message }) {
  return (
    <div className="percentage-field">
      <label>%</label>
      <input
        type="number"
        className={`percentage-input ${error ? "error" : ""}`}
        placeholder="100"
        max={100}
        min={0}
        {...fieldProps}
      />

      {error && <p className="percentage-field__message">{message}</p>}
    </div>
  );
}
