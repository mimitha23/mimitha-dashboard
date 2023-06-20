import { ENV } from "config/env";
import { put } from "redux-saga/effects";

export default function* errorController({
  error = null,
  location = "",
  errorSetter = () => {},
  setterParams = {},
}) {
  const errorMessage =
    error?.response?.data?.message ||
    setterParams.message ||
    error.message ||
    "";

  yield put(
    errorSetter({
      ...setterParams,
      message: errorMessage,
    })
  );

  if (ENV !== "DEV") return;

  console.log({
    hasError: true,
    location: `sagaHandler - ${location}`,
    message: errorMessage,
    error: error,
    stack: error.stack,
  });
}
