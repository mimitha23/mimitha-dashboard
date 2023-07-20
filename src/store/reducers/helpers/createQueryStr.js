export default function createQueryStr(str) {
  if (!str || typeof str !== "string") return "";
  return str.split(" ").join("_");
}
