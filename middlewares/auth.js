const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/unAuthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required."));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // Try to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Invalid or expired token."));
  }

  req.user = payload; // Attach the payload to the request
  return next();
};
