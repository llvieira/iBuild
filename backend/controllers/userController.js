const express = require('express');
const User = require('../models/user');
const util = require('../util/util');

const router = express.Router();

router.post('/', async (req, res) => {
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

module.exports = app => app.use('/users', router);
