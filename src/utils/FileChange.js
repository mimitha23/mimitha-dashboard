import { customValidators } from "./zod/helpers/customValidators";

class FileChangeUtils {
  // base
  async convertFilesToBase64Str(file, fileType) {
    try {
      const { hasError, base64Str } = await this.generateBase64Str({
        file,
        fileType,
      });

      if (hasError) {
        throw new Error(
          "თქვენს მიერ მითითებული მედია ფაილები არ არის ვალიდური"
        );
      }

      return base64Str;
    } catch (error) {
      throw new Error("დაფიქსირდა შეცდომა მედია ფაილების კონვერტირებისას");
    }
  }

  convertBase64StrToFile({ base64Str }) {
    if (!customValidators.isValidBase64ImageStr.validator(base64Str)) return;

    const base64 = base64Str.split(";base64,")[1];
    const mimeType = base64Str
      .slice(base64Str.indexOf("data:"), base64Str.indexOf(";base64,"))
      .replace("data:", "");

    const byteCharacters = atob(base64);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return new File([blob], this.generateRandomFileName(), { type: mimeType });
  }

  // utils

  generateBase64Str({ file, fileType = "image/" }) {
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

  generateRandomFileName(length = 32) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    const timestamp = Date.now();

    for (let i = 0; i < length * 2 + 1; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      if (i === Math.floor(length / 2)) result += "_";
      else result += characters.charAt(randomIndex);
    }

    return `${result}_${timestamp}`;
  }
}

const FileChange = new FileChangeUtils();
export default FileChange;
