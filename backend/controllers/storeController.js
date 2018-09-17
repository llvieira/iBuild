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

module.exports = app => app.use("/stores", router);