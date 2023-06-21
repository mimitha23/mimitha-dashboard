const controllStatus = {
  loading: () => ({
    loading: true,
    error: false,
    message: "",
  }),
  success: () => ({
    loading: false,
    error: false,
    message: "",
  }),
  error: (message) => ({
    loading: false,
    error: true,
    message,
  }),
  reset: () => ({
    loading: false,
    error: false,
    message: "",
  }),
};

export default controllStatus;
