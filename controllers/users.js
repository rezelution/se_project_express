const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");
const { SOME_ERROR_CODE } = require("../utils/errors");
const { sendUserResponse } = require("../utils/formatUser");

module.exports.getCurrentUser = (req, res) => {
  console.log(req.user);
  Users.findById(req.user._id)
    .orFail()
    .then((user) => sendUserResponse(res, user))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, imageUrl, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({ name, imageUrl, email, password: hash }))
    .then((user) => sendUserResponse(res, user))
    .catch((err) => handleError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(SOME_ERROR_CODE.INVALID_DATA).send({
      message: "Email and password are required.",
    });
  }
  return Users.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      sendUserResponse(res, user, token);
    })
    .catch((err) => handleError(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, imageUrl } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, imageUrl },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => sendUserResponse(res, user))
    .catch((err) => handleError(err, res));
};
