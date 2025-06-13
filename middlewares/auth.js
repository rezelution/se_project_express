const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const myError = new Error("Authorization required");
  myError.code = 401;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleError(myError, res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // Try to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleError(myError, res);
  }

  req.user = payload; // Attach the payload to the request
  next();
};
