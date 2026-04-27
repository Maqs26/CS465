const User = require('../models/users');
const { createToken } = require('../utils/token');

const sendJSONresponse = (res, status, content) => {
  res.status(status).json(content);
};

const buildToken = (user) =>
  createToken({
    _id: user._id,
    username: user.username,
    name: user.name,
  });

const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return sendJSONresponse(res, 400, {
      message: 'name, username, and password are required',
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendJSONresponse(res, 409, { message: 'username already exists' });
    }

    const user = new User({ name, username });
    user.setPassword(password);
    await user.save();

    return sendJSONresponse(res, 201, {
      token: buildToken(user),
      user: { name: user.name, username: user.username },
    });
  } catch (err) {
    return sendJSONresponse(res, 500, { message: 'registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return sendJSONresponse(res, 400, { message: 'username and password are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || !user.validPassword(password)) {
      return sendJSONresponse(res, 401, { message: 'invalid credentials' });
    }

    return sendJSONresponse(res, 200, {
      token: buildToken(user),
      user: { name: user.name, username: user.username },
    });
  } catch (err) {
    return sendJSONresponse(res, 500, { message: 'login failed', error: err.message });
  }
};

module.exports = {
  register,
  login,
};
