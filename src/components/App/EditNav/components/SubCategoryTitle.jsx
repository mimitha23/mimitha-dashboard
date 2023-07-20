export default function SubCategoryTitle({ onChange, title }) {
  return (
    <div className="edit-nav__blocks-list__item-title--box">
      <div className="edit-nav__blocks-list__item-title">
        &mdash;&nbsp;&nbsp;
        <label htmlFor="subcategory-title--ka">იარლიყი (ka):</label>
        &nbsp;&nbsp;
        <input
          type="text"
          placeholder="ტოპი"
          id="subcategory-title--ka"
          value={title.ka}
          name="ka"
          onChange={onChange}
        />
      </div>

      <div className="edit-nav__blocks-list__item-title">
        &mdash;&nbsp;&nbsp;
        <label htmlFor="subcategory-title--en">იარლიყი (en):</label>
        &nbsp;&nbsp;
        <input
          type="text"
          placeholder="tops"
          id="subcategory-title--en"
          name="en"
          value={title.en}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
