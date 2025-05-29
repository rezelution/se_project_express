const SOME_ERROR_CODE = {
  INVALID_DATA: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const SOME_ERROR_MSGS = {
  invalidData: "Invalid Data.",
  notFound: "Item not Found.",
  serverError: "An error occurred on the server.",
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

  return res.status(SOME_ERROR_CODE.SERVER_ERROR).send({
    message: SOME_ERROR_MSGS.serverError,
  });
};

module.exports = {
  SOME_ERROR_CODE,
  SOME_ERROR_MSGS,
  handleError,
};
