export default function isValidHexColor(color) {
  const isHexColor = /^#[0-9A-F]{6}$/i;
  return isHexColor.test(color);
}
