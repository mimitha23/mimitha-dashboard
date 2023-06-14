export function* loginHandler({ payload }) {
  try {
    yield;
    console.log(payload);
  } catch (error) {
    console.log(error);
  }
}
