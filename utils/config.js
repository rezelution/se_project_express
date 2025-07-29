const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required but not set");
}

module.exports = {
  JWT_SECRET,
};
