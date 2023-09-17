import { useSelector } from "react-redux";

import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";

import { Controller } from "react-hook-form";

import * as Styled from "./styles/TextureField.styled";
import * as Form from "components/layouts/Form";

export default function TextureField({ textureField, form }) {
  const { textures: textureSuggestions } = useSelector(
    registerProductSelectors.selectRegisterProductFormSuggestions
  );

  return (
    <Styled.TextureField>
      <Form.DynamicFieldHeader
        label="ტექსტურა"
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
        render={({ field, fieldState: { error } }) => (
          <>
            <ul className="texture-field__list">
              {textureField.fields.map((fieldItem, index) => (
                <li className="texture-field__list-item" key={fieldItem.id}>
                  <Controller
                    control={form.control}
                    name={`textures.${index}.texture`}
                    defaultValue={fieldItem.texture?.caption}
                    render={({
                      field: childField,
                      fieldState: { error: childError },
                    }) => (
                      <Form.InputFilterableSelect
                        id={`texture-${index}`}
                        placeholder="აირჩიეთ ტექსტურა"
                        list={textureSuggestions}
                        selectValue={(texture) => childField.onChange(texture)}
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
                    name={`textures.${index}.percentage`}
                    control={form.control}
                    defaultValue={fieldItem?.percentage}
                    render={({
                      field: childField,
                      fieldState: { error: childError },
                    }) => (
                      <Form.InputText
                        type="number"
                        label="%"
                        placeholder="100"
                        fieldProps={{
                          ...childField,
                          onChange: (e) => childField.onChange(+e.target.value),
                          min: 0,
                          max: 100,
                        }}
                        error={childError ? true : false}
                        message={childError?.message}
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

            {error?.textures && <p>{error?.textures?.message}</p>}
          </>
        )}
      />
    </Styled.TextureField>
  );
}
