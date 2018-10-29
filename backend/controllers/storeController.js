const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Store = require('../models/store');
const util = require('../util/util');
const User = require('../models/user');

const authRouter = express.Router();
const openRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/:storeId', async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);

    if (!store) {
      return res.status(400).send({ error: 'store not registered' });
    }

    return res.send(store);
  } catch (e) {
    return res.status(400).send({ error: 'error fetching items from a store' });
  }
});

openRouter.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    if (await Store.findOne({ email })) {
      return res.status(400).send({ error: 'Loja já cadastrada' });
    }

    const store = await Store.create(req.body);

    store.password = undefined;

    util.sendEmail(email);

    return res.send({ store, token: util.generateToken({ id: store.id }) });
  } catch (e) {
    return res.status(400).send({ error: `Registration failed: ${e}` });
  }
});

authRouter.post('/:id/items', async (req, res) => {
  const item = req.body;

  Store.findById(req.params.id, (err, store) => {
    if (err) return res.status(400).send({ error: 'store not registered' });

    if (!store.storage) {
      store.storage = [];
    }

    store.storage.push(item);

    store.save((err, updatedStore) => {
      if (err) return res.status(400).send({ error: `Registration failed: ${err}` });

      return res.send(updatedStore);
    });
  });
});

openRouter.get('/items', async (req, res) => {
  try {
    const stores = await Store.find({});
    let products = [];

    stores.forEach((item) => {
      products = products.concat(item.storage);
    });

    return res.send(products);
  } catch (e) {
    return res.status(400).send({ error: `Get failed: ${e}` });
  }
});

authRouter.put('/', async (req, res) => {
  try {
    const store = await Store.findById(req.userId);

    if (req.body.name) {
      store.name = req.body.name;
    }
    if (req.body.password) {
      store.password = req.body.password;
    }

    if (req.body.email) {
      const emailStore = await Store.find({ email: req.body.email });
      const emailUser = await User.find({ email: req.body.email });
      if (emailStore === [] || emailUser === []) {
        return res.status(400).send({ error: 'Email is already in use' });
      }
      store.email = req.body.email;
    }

    store.save();

    res.send(store);
  } catch (e) {
    return res.status(400).send({ error: `Updated failed: ${e}` });
  }
});


module.exports = app => app.use('/stores', openRouter, authRouter);
