export default function convertBase64StrToFile({ base64Str, fileName }) {
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

  return new File([blob], generateRandomFileName(), { type: mimeType });
}

function generateRandomFileName(length = 32) {
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
