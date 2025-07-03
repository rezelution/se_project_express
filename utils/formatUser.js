function formatUser(user) {
  return {
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    _id: user._id,
  };
}

function sendUserResponse(res, user, token = null) {
  if (token) {
    res.send({ data: formatUser(user), token });
  } else {
    res.send({ data: formatUser(user) });
  }
}

module.exports = {
  sendUserResponse,
};
