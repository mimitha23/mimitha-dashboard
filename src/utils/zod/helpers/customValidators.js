import { regex } from "./regex";

export const customValidators = {
  isGeorgianLetters: {
    validator: (value) => regex.is_georgian_letters.test(value),
    message: (key) => `${key} უნდა შეიყვანოთ მხოლოდ ქართული ასოებით.`,
  },

  isOnlyGeorgianLetters: {
    validator: (value) => regex.is_only_georgian_letters.test(value),
    message: (key) =>
      `${key} უნდა შეიყვანოთ მხოლოდ ქართული ასოებით, დაშორებისა და სიმბოლოების გარეშე.`,
  },

  isLatinLetters: {
    validator: (value) => regex.is_latin_letters.test(value),
    message: (key) => `${key} უნდა შეიყვანოთ მხოლოდ ლათინური ასოებით.`,
  },

  isOnlyLatinLetters: {
    validator: (value) => regex.is_only_latin_letters.test(value),
    message: (key) =>
      `${key} უნდა შეიყვანოთ მხოლოდ ლათინური ასოებით, დაშორებისა და სიმბოლოების გარეშე.`,
  },

  isValidQueryStr: {
    validator: (value) => regex.is_valid_query_str.test(value),
    message: (key) => `${key} უნდა იყოს ვალიდური query.`,
  },

  isValidHexColor: {
    validator: (value) => regex.is_valid_hex_color.test(value),
    message: (key) => `${key} უნდა იყოს ვალიდური hex ფერი. მაგ:#26e066.`,
  },

  isImageFile: {
    validator: (value) => value instanceof File && value.type.includes("image"),
    message: (key) =>
      `გთხოვთ მიუთითოთ ${key}. ${key} უნდა წარმოადგენდეს ფოტოს (JPP, JPEG, PNG, WEBP, SVG და ა.შ).`,
  },

  hasWhiteSpaceInSequence: {
    validator: (value) =>
      !regex.has_two_or_more_white_space_in_sequence.test(value),
    message: (key) => `${key} შეიცავს 2 ან მეტ შორისს თანმიმდევრობით.`,
  },

  isURL: {
    validator: (value) => regex.is_valid_url.test(value),
    message: (key) => `${key} უნდა წარმოადგენდეს ვალიდურ ბმულს.`,
  },

  isOptionalURL: {
    validator: (value) => (value ? regex.is_valid_url.test(value) : true),
    message: (key) => `${key} უნდა წარმოადგენდეს ვალიდურ ბმულს.`,
  },

  isValidBase64ImageStr: {
    validator: (value) => {
      const stringIsValidBase64Format =
        regex.is_valid_base_64_image_str.test(value);

      if (!stringIsValidBase64Format) return false;

      const base64Str = value.split(";base64,")[1];

      const binaryData = atob(base64Str);
      const validImageHeaders = [
        "\x89PNG",
        "\xFF\xD8\xFF",
        "GIF",
        "WEBP",
        "RIFF",
        "<svg",
      ];

      const decodedHeader = binaryData.substring(0, 5);

      return validImageHeaders.some((header) => decodedHeader.includes(header));
    },
    message: (key) => `${key} უნდა წარმოადგენდეს ვალიდურ ფაილს.`,
  },
};
