import { generateBase64Str } from "utils";

export default function useReactHookForm(form) {
  const onFileChange =
    ({ formPropertyName, fileType = "image/" }) =>
    async (reactEvent, fieldChangeEvent) => {
      try {
        const file = reactEvent.target.files[0];

        const base64Str = await convertFilesToBase64Str(file, fileType);

        fieldChangeEvent(base64Str);
      } catch (error) {
        form.setError(formPropertyName, error.message);
      }
    };

  const onMultipleFileChange =
    ({ formPropertyName, fileType = "image/" }) =>
    async (reactEvent, fieldChangeEvent) => {
      try {
        const files = reactEvent.target.files;

        if (!files || !files[0])
          throw new Error("გთხოვთ მიუთითეთ მედია ფაილები");

        const base64Strings = await Promise.all(
          Array.from(files).map(
            async (file) => await convertFilesToBase64Str(file, fileType)
          )
        );

        fieldChangeEvent(base64Strings);
      } catch (error) {
        console.log(error.message);
        form.setError(formPropertyName, error.message);
      }
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

  return { onFileChange, onSelect, onMultipleSelect, onMultipleFileChange };
}

async function convertFilesToBase64Str(file, fileType) {
  try {
    const { hasError, base64Str } = await generateBase64Str({ file, fileType });

    if (hasError) {
      throw new Error("თქვენს მიერ მითითებული მედია ფაილები არ არის ვალიდური");
    }

    return base64Str;
  } catch (error) {
    throw new Error("დაფიქსირდა შეცდომა მედია ფაილების კონვერტირებისას");
  }
}
