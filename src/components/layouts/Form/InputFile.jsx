import * as Styled from "./Form.styled";

export default function InputFile({
  name,
  label,
  onChange = () => {},
  error = false,
  message,
  fileRef,
  file,
  anotation,
}) {
  return (
    <Styled.Input className="form__input-text">
      {file && (
        <div className="form__file-icon--review">
          <figure className="form__file-icon--review__fig">
            <img src={URL.createObjectURL(file)} alt="" />
          </figure>
        </div>
      )}

      <label htmlFor="form-file--upload" className="form__input-file--label">
        {label ? label : "აირჩიეთ ფაილი"}
      </label>

      <input
        ref={fileRef}
        id="form-file--upload"
        type="file"
        name={name}
        onChange={onChange}
        accept="image/*"
        multiple={false}
        hidden
      />

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.Input>
  );
}
