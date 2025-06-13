const SOME_ERROR_CODE = {
  INVALID_DATA: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT_ERROR: 409,
  AUTHORIZATION_REQUIRED: 401,
  FORBIDDEN: 403,
};

const SOME_ERROR_MSGS = {
  invalidData: "Invalid Data.",
  notFound: "Item not Found.",
  serverError: "An error occurred on the server.",
  conflictError: "A duplicate E-mail was found",
  authorizationRequired: "Authorization required.",
  forbidden: "You can't delete this item because you are not the owner.",
};

const handleError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(SOME_ERROR_CODE.INVALID_DATA).send({
      message: err.message || SOME_ERROR_MSGS.invalidData,
    });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(SOME_ERROR_CODE.NOT_FOUND).send({
      message: err.message || SOME_ERROR_MSGS.notFound,
    });
  }

  if (err.code === 11000) {
    return res.status(SOME_ERROR_CODE.CONFLICT_ERROR).send({
      message: err.message || SOME_ERROR_MSGS.conflictError,
    });
  }

  if (err.code === 401) {
    return res.status(SOME_ERROR_CODE.AUTHORIZATION_REQUIRED).send({
      message: err.message || SOME_ERROR_MSGS.authorizationRequired,
    });
  }

  if (err.code === 403) {
    return res.status(SOME_ERROR_CODE.FORBIDDEN).send({
      message: err.message || SOME_ERROR_MSGS.forbidden,
    });
  }

  if (err.code === 400) {
    return res.status(SOME_ERROR_CODE.INVALID_DATA).send({
      message: err.message || SOME_ERROR_MSGS.invalid_data,
    });
  }

  return res.status(SOME_ERROR_CODE.SERVER_ERROR).send({
    message: SOME_ERROR_MSGS.serverError,
  });
};

module.exports = {
  SOME_ERROR_CODE,
  SOME_ERROR_MSGS,
  handleError,
};
