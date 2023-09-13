import { AddFieldButton } from "components/layouts/Form";

export default function TextureFieldHeader({ onAddField }) {
  return (
    <div className="texture-head">
      <label>ტექსტურა</label>
      <AddFieldButton onAddField={onAddField} />
    </div>
  );
}
