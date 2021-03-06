const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Store = require('../models/store');
const util = require('../util/util');

const router = express.Router();

router.post('/user', async (req, res) => {
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

  return res.send({
    user,
    token,
  });
});

router.post('/store', async (req, res) => {
  const { email, password } = req.body;

  const store = await Store.findOne({ email }).select('+password');

  if (!store) {
    return res.status(400).send({ error: 'Store not found' });
  }

  if (!await bcrypt.compare(password, store.password)) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  const token = util.generateToken({ id: store.id });

  store.password = undefined;
  store.id = undefined;
  store.email = undefined;

  return res.send({
    store,
    token,
  });
});

module.exports = app => app.use('/auth', router);
