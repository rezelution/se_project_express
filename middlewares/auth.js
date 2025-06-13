const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");
const { SOME_ERROR_CODE } = require("../utils/errors");
const { SOME_ERROR_MSGS } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(
      SOME_ERROR_CODE.AUTHORIZATION_REQUIRED.send({
        message: SOME_ERROR_MSGS.authorizationRequired,
      })
    );
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // Try to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleError(err, res);
  }

  req.user = payload; // Attach the payload to the request
  return next();
};
