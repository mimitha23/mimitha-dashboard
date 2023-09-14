export default function generateBase64Str({ file, fileType = "image/" }) {
  return new Promise((resolve, _) => {
    const isImageFile =
      file && file instanceof File && file.type.includes(fileType);

    if (!isImageFile) resolve({ hasError: true, base64Str: "" });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return (fileReader.onload = async (e) => {
      try {
        const imageBase64 = e.currentTarget.result.toString() || "";
        resolve({ hasError: false, base64Str: imageBase64 });
      } catch (error) {
        resolve({ hasError: true, base64Str: "" });
      }
    });
  });
}
