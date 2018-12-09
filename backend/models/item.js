const mongoose = require('../database/index');

const ItemSchema = new mongoose.Schema({
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
    min: 0,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  storeId: {
    type: String,
  },
  description: {
    type: String,
    required: false
  },
  sold: {
    type: Number,
    required: false
  },
  size: {
    type: String,
    required: false
  }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
