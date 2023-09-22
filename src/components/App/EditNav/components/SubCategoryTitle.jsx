import { Controller } from "react-hook-form";

export default function SubCategoryTitle({ form }) {
  return (
    <div className="edit-nav__blocks-list__item-title--box">
      <Controller
        name={`${form.name}.ka`}
        control={form.control}
        render={({ field }) => (
          <div className="edit-nav__blocks-list__item-title">
            &mdash;&nbsp;&nbsp;
            <label htmlFor="subcategory-title--ka">იარლიყი (ka):</label>
            &nbsp;&nbsp;
            <input
              type="text"
              placeholder="ტოპი"
              id="subcategory-title--ka"
              {...field}
            />
          </div>
        )}
      />

      <Controller
        name={`${form.name}.en`}
        control={form.control}
        render={({ field }) => (
          <div className="edit-nav__blocks-list__item-title">
            &mdash;&nbsp;&nbsp;
            <label htmlFor="subcategory-title--en">იარლიყი (en):</label>
            &nbsp;&nbsp;
            <input
              type="text"
              placeholder="tops"
              id="subcategory-title--en"
              {...field}
            />
          </div>
        )}
      />
    </div>
  );
}
