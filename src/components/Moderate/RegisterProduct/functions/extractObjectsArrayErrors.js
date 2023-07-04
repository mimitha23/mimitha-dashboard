export default function extractError(errors) {
  if (!errors) return {};

  const temp = {};

  errors.forEach((error) => {
    temp[error.key] = {
      hasError: error.hasError,
      message: error.message,
    };
  });

  return temp;
}
