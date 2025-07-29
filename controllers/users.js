const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { sendUserResponse } = require("../utils/formatUser");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

module.exports.getCurrentUser = (req, res, next) => {
  console.log(req.user);
  Users.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))

    .then((user) => {
      if (!user) {
        throw new BadRequestError("No user with matching ID found");
      }
      sendUserResponse(res, user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({ name, avatar, email, password: hash }))
    .then((user) => sendUserResponse(res, user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("A user with this email already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("You must enter a valid E-mail"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required."));
  }
  return Users.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      sendUserResponse(res, user, token);
    })
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => sendUserResponse(res, user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Invalid data provided for update"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else {
        next(err);
      }
    });
};
