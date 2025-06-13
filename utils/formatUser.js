function formatUser(user) {
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    _id: user._id,
  };
}

function sendUserResponse(res, user) {
  res.send({ data: formatUser(user) });
}

function sendUsersResponse(res, users) {
  res.send({ data: users.map(formatUser) });
}

module.exports = {
  sendUserResponse,
  sendUsersResponse,
};
