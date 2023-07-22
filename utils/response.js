const successResp = (res, message, data, status = 200) => res.status(status).json({
  code: status,
  message,
  data,
});

const errorResp = (res, message, status = 400) => res.status(status).json({
  code: status,
  message,
});

export { successResp, errorResp };
