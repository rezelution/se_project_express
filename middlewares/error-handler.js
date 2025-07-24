module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.error(err);

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'An internal server error occurred'
      : message,
  });
};