const express = require('express');

const router = express.Router();

// Rotas do usuario aki

module.exports = app => app.use('/users', router);
