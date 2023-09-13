import { Controller } from "react-hook-form";
import * as Styled from "./styles/WarningField.styled";
import * as Form from "components/layouts/Form";

export default function WarningField({ warningField, form }) {
  return (
    <Styled.WarningField>
      <Form.DynamicFieldHeader
        label="გაფრთხილება"
        onAddField={() => warningField.append({ ka: "", en: "" })}
      />

      <Controller
        name="warnings"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <>
            <ul className="fields-list">
              {warningField.fields.map((fieldItem, index) => (
                <li className="warning-fields--box" key={fieldItem.id}>
                  <Controller
                    name={`warnings.${index}.ka`}
                    control={form.control}
                    render={({
                      field: childField,
                      fieldState: { error: childError },
                    }) => (
                      <Form.InputText
                        label="ka:"
                        placeholder="გაფრთხილება"
                        fieldProps={childField}
                        error={childError ? true : false}
                        message={childError?.message}
                      />
                    )}
                  />

                  <Controller
                    name={`warnings.${index}.en`}
                    control={form.control}
                    render={({
                      field: childField,
                      fieldState: { error: childError },
                    }) => (
                      <Form.InputText
                        label="en:"
                        placeholder="warning"
                        fieldProps={childField}
                        error={childError ? true : false}
                        message={childError?.message}
                      />
                    )}
                  />

                  {index > 0 && (
                    <Form.RemoveFieldButton
                      onRemove={() => warningField.remove(index)}
                    />
                  )}
                </li>
              ))}
            </ul>

            {error?.warnings && <p>{error?.warnings?.message}</p>}
          </>
        )}
      />
    </Styled.WarningField>
  );
}
