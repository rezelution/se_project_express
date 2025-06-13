const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");
const { sendUsersResponse } = require("../utils/formatUser");
const { sendUserResponse } = require("../utils/formatUser");

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => sendUsersResponse(res, users))
    .catch((err) => handleError(err, res));
};

module.exports.getCurrentUser = (req, res) => {
  Users.findById(req.user._id)
    .orFail()
    .then((user) => sendUserResponse(res, user))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({ name, avatar, email, password: hash }))
    .then((user) => sendUserResponse(res, user))
    .catch((err) => handleError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  const missingFields = new Error("Email and password are required");
  missingFields.code = 400;

  if (!email || !password) {
    return handleError(missingFields, res);
  }
  return Users.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => handleError(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => sendUserResponse(res, user))
    .catch((err) => handleError(err, res));
};
