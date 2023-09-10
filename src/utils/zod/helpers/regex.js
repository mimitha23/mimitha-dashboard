export const regex = {
  has_white_space: /\s/g,
  has_two_or_more_white_space_in_sequence: /.*\s\s+.*/,
  is_word: /\w/g,
  is_email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  is_only_latin_letters: /^[A-Za-z]*$/,
  is_latin_letters: /^[A-Za-z\s]*$/,
  is_latin_letters_and_dash: /^[A-Za-z\s-]*$/,
  is_only_georgian_letters: /^[ა-ჰ]*$/,
  is_georgian_letters: /^[ა-ჰ\s]*$/,
  is_valid_password: /^([a-zA-Z0-9-_.]{6,})*$/,
  is_valid_hex_color: /^#[0-9A-F]{6}$/i,
  is_file_type_image: /image\/*/,
  is_base_64_str: /^data:image\/(png|jpe?g|gif|webp);base64,/,
};
