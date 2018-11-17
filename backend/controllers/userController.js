const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');
const util = require('../util/util');
const Store = require('../models/store');
const Item = require('../models/item');

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


authRouter.post('/cart/', async (req, res) => {
  const { idItem, idStore, amount } = req.body;
  const user = await User.findById(req.idLogged);
  const store = await Store.findById(idStore);

  try {
    if (!store) {
      return res.status(404).send({ error: 'Store not Found' });
    }

    await user.cart.forEach((itemCart) => {
      console.log(itemCart);
      if (idItem == itemCart.id) {
        return res.end.send({ error: 'See Other' });
      }
    });


    store.storage.forEach((itemStore) => {
      if (idItem == itemStore._id) {
        const itemCart = { id: idItem, idStore, amount };
        user.cart.push(itemCart);
        user.save();
      }
    });

    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send({ error: `Registration failed ${e}` });
  }
});

authRouter.get('/cart/', async (req, res) => {
  const user = await User.findById(req.idLogged);

  try {
    if (!user) {
      return res.status(404).send({ error: 'User not Found' });
    }

    return res.status(200).send(user.cart);
  } catch (e) {
    return res.status(400).send({ error: `Get failed ${e}` });
  }
});


authRouter.delete('/cart/', async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(req.idLogged);
  try {
    if (!user) {
      return res.status(404).send({ error: 'User not Found' });
    }
    let i = 0;
    user.cart.forEach((itemCart) => {
      if (id == itemCart.id) {
        user.cart.splice(i, 1);
        user.save();
      }
      i++;
    });

    return res.status(200).send(user.cart);
  } catch (e) {
    return res.status(400).send({ error: `Get failed ${e}` });
  }
});


authRouter.post('/favorites/', async (req, res) => {
  const { id, idStore } = req.body;
  const user = await User.findById(req.idLogged);
  const store = await Store.findById(idStore);

  try {
    if (!store) {
      return res.status(404).send({ error: 'Store not Found' });
    }

    await user.favorites.forEach((itemFavorite) => {
      console.log(itemFavorite);
      if (id == itemFavorite.id) {
        return res.end.send({ error: 'See Other' });
      }
    });


    store.storage.forEach((itemStore) => {
      if (id == itemStore._id) {
        const itemFavorite = { id, idStore: store._id };
        user.favorites.push(itemFavorite);
        user.save();
      }
    });

    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send({ error: `Registration failed ${e}` });
  }
});

authRouter.get('/favorites/', async (req, res) => {
  const user = await User.findById(req.idLogged);
  try {
    if (!user) {
      return res.status(404).send({ error: 'User not Found' });
    }

    const valor = user.favorites;

    return res.status(200).send(valor);
  } catch (e) {
    return res.status(400).send({ error: `Get failed ${e}` });
  }
});

authRouter.delete('/favorites/', async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(req.idLogged);
  try {
    if (!user) {
      return res.status(404).send({ error: 'User not Found' });
    }
    let i = 0;
    user.favorites.forEach((itemFavorite) => {
      if (id == itemFavorite.id) {
        user.favorites.splice(i, 1);
        user.save();
      }
      i++;
    });

    return res.status(200).send(user.favorites);
  } catch (e) {
    return res.status(400).send({ error: `Get failed ${e}` });
  }
});

authRouter.post('/ItemStore/', async (req, res) => {
  const { id, idStore } = req.body;
  const store = await Store.findById(idStore);

  try {
    if (!store) {
      return res.status(404).send({ error: 'Store not Found' });
    }


    store.storage.forEach((itemStore) => {
      if (id == itemStore._id) {
        res.send(itemStore);
      }
    });

    return res.status(404).send({ error: 'Item not found' });
  } catch (e) {
    return res.status(400).send({ error: `Registration failed ${e}` });
  }
});


module.exports = app => app.use('/users', openRouter, authRouter);
