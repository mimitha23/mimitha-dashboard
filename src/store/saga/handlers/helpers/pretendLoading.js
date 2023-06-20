export default function* pretendLoading(triggerError = false, ms = 2000) {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      triggerError ? reject(new Error("triggered new error")) : resolve();
    }, ms);
  });
}
