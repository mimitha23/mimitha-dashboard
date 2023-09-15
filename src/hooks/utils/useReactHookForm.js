import { FileChange } from "utils";
import { customValidators } from "utils/zod/helpers/customValidators";

export default function useReactHookForm(form) {
  // change file to base64
  const onBase64FileChange =
    ({ formPropertyName, fileType = "image/" }) =>
    async (reactEvent, fieldChangeEvent) => {
      try {
        const file = reactEvent.target.files[0];

        const { validator, message } = customValidators.isImageFile;

        if (!validator(file))
          return form.setError(formPropertyName, message("მედია ფაილი"));

        const base64Str = await FileChange.convertFilesToBase64Str(
          file,
          fileType
        );

        fieldChangeEvent(base64Str);
      } catch (error) {
        form.setError(formPropertyName, error.message);
      }
    };

  const onBase64MultipleFileChange =
    ({ formPropertyName, fileType = "image/" }) =>
    async (reactEvent, fieldChangeEvent) => {
      try {
        const files = reactEvent.target.files;

        const { validator, message } = customValidators.isImageFile;

        if (
          !files ||
          !Array.isArray(Array.from(files)) ||
          !files[0] ||
          !Array.from(files).every((f) => validator(f))
        )
          throw new Error(message("მედია ფაილები"));

        const base64Strings = await Promise.all(
          Array.from(files).map(
            async (file) =>
              await FileChange.convertFilesToBase64Str(file, fileType)
          )
        );

        fieldChangeEvent(base64Strings);
      } catch (error) {
        console.log(error.message);
        form.setError(formPropertyName, error.message);
      }
    };

  // file change
  const onVideoFileChange =
    ({ formPropertyName, fileType = "video/" }) =>
    (reactEvent, fieldChangeEvent) => {
      const file = reactEvent.target.files[0];

      const { validator, message } = customValidators.isVideoFile;

      if (!validator(file))
        return form.setError(formPropertyName, message("ვიდეო"));

      fieldChangeEvent(file);
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

  return {
    onSelect,
    onMultipleSelect,
    onVideoFileChange,
    onBase64FileChange,
    onBase64MultipleFileChange,
  };
}
