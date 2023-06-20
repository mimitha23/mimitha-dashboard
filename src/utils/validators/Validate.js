export default class Validate {
  // regexes
  regs = {
    has_white_space: /\s/g,
    is_word: /\w/g,
    is_email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    is_only_latin_letters: /^[A-Za-z]*$/,
    is_only_latin_letters_with_white_space: /^[A-Za-z\s]*$/,
    is_only_latin_letters_with_white_space_and_dash: /^[A-Za-z\s-]*$/,
    is_only_georgian_letters: /^[ა-ჰ]*$/,
    is_valid_password: /^([a-zA-Z0-9-_.]{6,})*$/,
    is_valid_hex_color: /^#[0-9A-F]{6}$/i,
  };

  notIsEmpty({ value, key }) {
    let isValid = true;

    if (
      typeof value !== "string" ||
      (typeof value === "string" && !value.trim())
    )
      isValid = false;

    const message = isValid ? "" : `${key} არ შეიძლება იყოს ცარიელი`;

    return { hasError: !isValid, message };
  }

  isOnlyGeorgianLetters({ value, key }) {
    let isValid = true;

    if (
      typeof value !== "string" ||
      (typeof value === "string" &&
        !this.regs.is_only_georgian_letters.test(value))
    )
      isValid = false;

    const message = isValid
      ? ""
      : `${key} უნდა შეიყვანოთ მხოლოდ ქართული ასოებით`;

    return { hasError: !isValid, message };
  }

  isOnlyLatinLetters({ value, key }) {
    let isValid = true;

    if (
      typeof value !== "string" ||
      (typeof value === "string" &&
        !this.regs.is_only_latin_letters.test(value))
    )
      isValid = false;

    const message = isValid
      ? ""
      : `${key} უნდა შეიყვანოთ მხოლოდ ლათინური ასოებით`;

    return { hasError: !isValid, message };
  }

  isValidHexColor({ value, key }) {
    let isValid = true;

    if (
      typeof value !== "string" ||
      (typeof value === "string" && !this.regs.is_valid_hex_color.test(value))
    )
      isValid = false;

    const message = isValid
      ? ""
      : `${key} უნდა იყოს ვალიდური hex ფერი. მაგ:#26e066`;

    return { hasError: !isValid, message };
  }
}
