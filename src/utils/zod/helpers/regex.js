export const regex = {
  has_white_space: /\s/g,
  has_two_or_more_white_space_in_sequence: /.*\s\s+.*/,
  is_word: /\w/g,
  is_email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  is_only_latin_letters: /^[A-Za-z]*$/,
  is_latin_letters: /^[A-Za-z\s]*$/,
  is_valid_query_str: /^[A-Za-z_\s]*$/,
  is_latin_letters_and_dash: /^[A-Za-z\s-]*$/,
  is_only_georgian_letters: /^[ა-ჰ]*$/,
  is_georgian_letters: /^[ა-ჰ\s]*$/,
  is_valid_password: /^([a-zA-Z0-9-_.]{6,})*$/,
  is_valid_hex_color: /^#[0-9A-F]{6}$/i,
  is_file_type_image: /image\/*/,
  is_valid_base_64_image_str:
    /^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,.*/,
  is_valid_url: /^(ftp|http|https):\/\/[^ "]+$/,
};
