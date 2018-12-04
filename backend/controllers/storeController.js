const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Store = require('../models/store');
const util = require('../util/util');
const User = require('../models/user');
const Item = require('../models/item');

const authRouter = express.Router();
const openRouter = express.Router();

authRouter.use(authMiddleware);

openRouter.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    if (await Store.findOne({ email })) {
      return res.status(400).send({ error: 'Loja já cadastrada' });
    }

    req.body.storage = [];

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
    const item = await Item.findById(itemID);

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
    const page_size = parseInt(req.query.pageSize) || 6;
    const page_num = parseInt(req.query.pageNumber) || 0;
    const title = req.query.title || "";

    const skip = page_size * page_num;

    const products = await Item.find({ title: new RegExp(title, "i") }).skip(skip).limit(page_size);

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
  try {
    const store = await Store.findById(req.idLogged);

    if (!store) {
      return res.status(400).send({ error: 'Store not registered' });
    }

    req.body.storeId = store._id;
    const newItem = await Item.create(req.body);

    store.storage.push(newItem._id);
    await store.save();

    return res.status(200).send(newItem);
  } catch (e) {
    return res.status(400).send({ error: `Registration failed: ${e}` });
  }
});

authRouter.put('/items', async (req, res) => {
  const item = req.body;

  try {
    const stores = await Store.find({ "_id": req.idLogged, "storage": item._id });

    if (stores.length === 0) {
      return res.status(400).send({ error: 'Store or item not registered' });
    }

    const updateItem = await Item.findById(item._id);

    updateItem.img = item.img;
    updateItem.title = item.title;
    updateItem.value = item.value;
    updateItem.delivery = item.delivery;
    updateItem.brand = item.brand;
    updateItem.category = item.category;
    updateItem.description = item.description;
    updateItem.quantity = item.quantity;

    await updateItem.save();

    return res.status(200).send(updateItem);
  } catch (e) {
    return res.status(400).send({ error: `Updated failed: ${e}` });
  }
});

authRouter.delete('/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const stores = await Store.find({ "_id": req.idLogged, "storage": itemId });

    if (stores.length === 0) {
      return res.status(400).send({ error: 'Store or item not registered' });
    }

    const store = stores[0];

    await Item.findByIdAndDelete(itemId);
    store.storage.splice(store.storage.indexOf(itemId), 1);

    const updatedStore = await store.save();

    return res.status(200).send(updatedStore);
  } catch (e) {
    return res.status(400).send({ error: `Remove failed: ${err}` })
  }
});

authRouter.get('/items', async (req, res) => {
  try {
    const page_size = parseInt(req.query.pageSize) || 6;
    const page_num = parseInt(req.query.pageNumber) || 0;
    const title = req.query.title || "";

    const skip = page_size * page_num;

    const products = await Item.find({ title: new RegExp(title, "i"), storeId: req.idLogged }).skip(skip).limit(page_size);

    return res.send(products);
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
      if (emailStore.length !== 0 || emailUser.length !== 0) {
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
