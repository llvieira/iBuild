const express = require("express");
const authMiddleware = require("../middlewares/auth");
const Store = require("../models/store");
const User = require("../models/user");
const util = require("../util/util");

const router = express.Router();
router.use(authMiddleware);

router.get('/:storeId', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const store = await Store.findById(req.params.storeId);

        if(!user) {
            return res.status(400).send({error: "user not registered"});
        }

        if(!store) {
            return res.status(400).send({error: "store not registered"});
        }

        res.send(store);

    } catch (e) {
        console.log(e);

        return res.status(400).send({error: "error fetching items from a store"});
    }
});

router.post('/', async (req, res) => {
    let { email } = req.body;

    try {

        if (await Store.findOne({ email })) {
            return res.status(400).send({ error: "Loja já cadastrada" });
        }

        let store = await Store.create(req.body);

        store.password = undefined;

        util.sendEmail(email);

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