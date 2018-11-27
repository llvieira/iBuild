const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Store = require('../models/store');
const util = require('../util/util');
const User = require('../models/user');

const authRouter = express.Router();
const openRouter = express.Router();

authRouter.use(authMiddleware);

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

openRouter.get('/items/:itemID', async (req, res) => {
  try {
    const itemID = req.params.itemID;
    const stores = await Store.find({});

    const item = stores
      .reduce((items, store) => [...items, ...store.storage], [])
      .reduce((found, item) => (item.id === itemID) ? item : found, null);

    if (item)
      return res.send(item);
    else
      throw "Item not found";
  } catch (e) {
    return res.status(400).send({ error: `Get failed: ${e}` });
  }
});

openRouter.get('/allItems', async (req, res) => {
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

openRouter.get('/store/:storeId', async (req, res) => {
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

authRouter.post('/items', async (req, res) => {
  const item = req.body;

  Store.findById(req.idLogged, (err, store) => {
    if (err) return res.status(400).send({ error: 'store not registered' });

    item.storeId = req.idLogged;

    store.storage.push(item);

    store.save((err, updatedStore) => {
      if (err) return res.status(400).send({ error: `Registration failed: ${err}` });

      return res.send(updatedStore);
    });
  });
});

authRouter.put('/items', async (req, res) => {
  const item = req.body;

  Store.findOneAndUpdate({ "_id": req.idLogged, "storage._id": item._id },
    {
      "$set": {
        "storage.$.img": item.img,
        "storage.$.title": item.title,
        "storage.$.value": item.value,
        "storage.$.delivery": item.delivery,
        "storage.$.brand": item.brand,
        "storage.$.category": item.category,
        "storage.$.quantity": item.quantity,
        "storage.$.description": item.description,
      }
    },
    {
      new: true
    },
    (err, store) => {
      if (err) return res.status(400).send({ error: `Updated failed: ${err}` });

      return res.status(200).send(store);
    }
  );
});

authRouter.delete('/items/:itemId', async (req, res) => {
  Store.findById(req.idLogged, (err, store) => {
    if (err) return res.status(400).send({ error: 'store not registered' });

    const item = store.storage.id(req.params.itemId);

    if (!item) return res.status(400).send({ error: 'item not registered' });

    item.remove();

    store.save((err, updatedStore) => {
      if (err) return res.status(400).send({ error: `Remove failed: ${err}` });

      return res.status(200).send(updatedStore);
    });
  });
});

authRouter.get('/items', async (req, res) => {
  try {
    const store = await Store.findById(req.idLogged);

    return res.send(store.storage);
  } catch (e) {
    return res.status(400).send({ error: `Get failed: ${e}` });
  }
});

authRouter.get('/', async (req, res) => {
  try {
    const store = await Store.findById(req.idLogged);

    if (store) {
      return res.send(store);
    }

    return res.status(404).send({ error: 'Store not found' });
  } catch (e) {
    return res.status(400).send({ error: `Get failed: ${e}` });
  }
});

authRouter.put('/', async (req, res) => {
  try {
    const store = await Store.findById(req.idLogged);

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
