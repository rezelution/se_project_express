const { JWT_SECRET = "mySuper$ecretKey123" } = process.env;
console.log("JWT_SECRET being used:", JWT_SECRET);

module.exports = {
  JWT_SECRET,
};
