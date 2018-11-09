const mongoose = require('../database/index');

const itemSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, { noId: true });

module.exports = itemSchema;
