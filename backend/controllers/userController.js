const express = require("express");

const router = express.Router();


router.get('/', function(req, res) {
    res.send('Hello World!22222222');
});

module.exports = app => app.use("/users", router);