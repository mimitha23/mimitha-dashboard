export const REQUEST_STATUS_STAGE = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  IDLE: "IDLE",
};

const controlStatus = {
  loading: () => ({
    stage: REQUEST_STATUS_STAGE.PENDING,
    loading: true,
    error: false,
    message: "",
  }),
  success: (stage) => ({
    stage: stage || REQUEST_STATUS_STAGE.IDLE,
    loading: false,
    error: false,
    message: "",
  }),
  error: (message) => ({
    stage: REQUEST_STATUS_STAGE.FAIL,
    loading: false,
    error: true,
    message,
  }),
  default: () => ({
    stage: REQUEST_STATUS_STAGE.IDLE,
    loading: false,
    error: false,
    message: "",
  }),
};

export default controlStatus;
