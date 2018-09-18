const mongoose = require("../database/index");

let itemSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  delivery: {
    type: Boolean,
    required: true
  }
}, { noId: true });

module.exports = itemSchema;