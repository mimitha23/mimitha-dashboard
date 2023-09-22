import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

import { selectProductTypesWithCaption } from "store/selectors/moderate/productTypeSelectors";

import ControlListButtons from "./ControlListButtons";
import { InputFilterableSelect } from "components/layouts/Form";

export default function RoutesListItem({ onAddRoute, onRemoveRoute, form }) {
  const productTypes = useSelector(selectProductTypesWithCaption);

  return (
    <li className="routes-box__list-item">
      <ControlListButtons onAdd={onAddRoute} onRemove={onRemoveRoute} />
      &mdash;&nbsp;&nbsp;
      <Controller
        name={`${form.name}`}
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <InputFilterableSelect
            id="1"
            placeholder="კურსი"
            list={productTypes}
            error={error ? true : false}
            message={error?.message}
            inputValue={field.value.caption}
            fieldProps={{
              ...field,
              onChange: (e) =>
                field.onChange({
                  ...field.value,
                  caption: e.target.value,
                }),
            }}
            selectValue={(productType) => field.onChange(productType)}
          />
        )}
      />
    </li>
  );
}
