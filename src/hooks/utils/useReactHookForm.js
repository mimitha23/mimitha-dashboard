import { generateBase64Str } from "utils";

export default function useReactHookForm(form) {
  const onFileChange = async (reactEvent, fieldChangeEvent) => {
    const file = reactEvent.target.files[0];

    const { hasError, base64Str } = await generateBase64Str({
      file,
      fileType: "image/",
    });

    if (hasError)
      return form.setError(
        "thumbnail",
        "ფაილის ნიშნული უნდა წარმოადგენდეს ვალიდურ ფაილს"
      );

    fieldChangeEvent(base64Str);
  };

  function onSelect({ key, item }) {
    const f = form.getValues();
    form.setValue(key, { ...f[key], ...item });
  }

  function onMultipleSelect({ key, item, field }) {
    const existingItems = form.getValues()[key];

    const itemIsInListIndex = existingItems.findIndex(
      (existingItem) => existingItem._id === item._id
    );

    if (itemIsInListIndex >= 0) field.remove(itemIsInListIndex);
    else field.append(item);
  }

  return { onFileChange, onSelect, onMultipleSelect };
}
