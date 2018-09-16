const express = require("express");
const Store = require("../models/store");

const router = express.Router();

router.post('/', async (req, res) => {

  let { email } = req.body;

  try {

    if (await Store.findOne({ email })) {
      return res.status(400).send({ error: "Loja já cadastrada" });
    }

    let store = await Store.create(req.body);

    store.password = undefined;

    return res.send({ store });
  } catch (e) {
    return res.status(400).send({ error: 'Registration failed: ' + e });
  }

});

router.post('/:id/items', async (req, res) => {

  let item = req.body;

  Store.findById(req.params.id, function (err, store) {
    if (err) return res.status(400).send({ error: "store not registered" });

    if (!store.storage) {
      store.storage = []
    }

    store.storage.push(item);

    store.save(function (err, updatedStore) {
      if (err) return res.status(400).send({ error: 'Registration failed: ' + err });

      return res.send(updatedStore);
    });
  });
});

module.exports = app => app.use("/stores", router);