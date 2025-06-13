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

module.exports = {
  sendUserResponse,
};
