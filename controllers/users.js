const Users = require("../models/users");
const { handleError } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  Users.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};
