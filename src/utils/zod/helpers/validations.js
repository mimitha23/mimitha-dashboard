import z from "zod";
import { customValidators } from "../helpers/customValidators";

export const isGeorgianLetters = (key) =>
  z
    .string()
    .trim()
    .nonempty()
    .refine(customValidators.isGeorgianLetters.validator, {
      message: customValidators.isGeorgianLetters.message(key),
    });

export const isLatinLetters = (key) =>
  z
    .string()
    .trim()
    .nonempty()
    .toLowerCase()
    .refine(customValidators.isLatinLetters.validator, {
      message: customValidators.isLatinLetters.message(key),
    });

export const isValidHexColor = (key) =>
  z
    .string()
    .trim()
    .nonempty()
    .toLowerCase()
    .refine(customValidators.isValidHexColor.validator, {
      message: customValidators.isValidHexColor.message(key),
    });

export const isValidBase64ImageStr = (key) =>
  z
    .string()
    .refine(
      customValidators.isValidBase64ImageStr.validator,
      customValidators.isValidBase64ImageStr.message("პროდუქტის მედია ფაილები")
    );

export const optionalBase64ImageStr = () =>
  z
    .string()
    .refine(
      (value) =>
        value === "" || customValidators.isValidBase64ImageStr.validator,
      customValidators.isValidBase64ImageStr.message()
    )
    .optional();

export const isOptionalVideoFile = (key) =>
  z
    .any()
    .refine(
      (value) => value === "" || customValidators.isVideoFile.validator,
      customValidators.isVideoFile.message(key)
    )
    .optional();

export const optionalUrlsArray = () => z.array(z.string().url().optional());

export const isOptionalUrl = (key) =>
  z
    .string()
    .trim()
    .refine(customValidators.isOptionalURL.validator, {
      message: customValidators.isOptionalURL.message(key),
    })
    .optional();

export const isValidQueryStr = (key) =>
  z
    .string()
    .trim()
    .nonempty()
    .toLowerCase()
    .refine(customValidators.isValidQueryStr.validator, {
      message: customValidators.isValidQueryStr.message(key),
    });
