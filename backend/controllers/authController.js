const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const util = require('../util/util');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  const token = util.generateToken({ id: user.id });

  user.password = undefined;
  user.id = undefined;
  user.email = undefined;

  return res.send({
    user,
    token,
  });
});

module.exports = app => app.use('/auth', router);
