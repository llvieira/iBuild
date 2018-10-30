const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');
const util = require('../util/util');

const authRouter = express.Router();
const openRouter = express.Router();

authRouter.use(authMiddleware);

openRouter.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'Usuário já cadastrado' });
    }

    const user = await User.create(req.body);

    user.password = undefined;

    util.sendEmail(email);
    return res.send({ user, token: util.generateToken({ id: user.id }) });
  } catch (e) {
    return res.status(400).send({ error: `Registration failed ${e}` });
  }
});

authRouter.put('/', async (req, res) => {
  try {
    const user = await User.findById(req.idLogged);

    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.newPassword) {
      user.password = req.body.newPassword;
    }

    if (req.body.email) {
      const emailStore = await User.find({ email: req.body.email });
      const emailUser = await User.find({ email: req.body.email });
      if (emailStore === [] || emailUser === []) {
        return res.status(400).send({ error: 'Email is already in use' });
      }
      user.email = req.body.email;
    }

    user.save();

    res.send(user);
  } catch (e) {
    return res.status(400).send({ error: `Updated failed: ${e}` });
  }
});

module.exports = app => app.use('/users', openRouter, authRouter);
