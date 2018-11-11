const bcrypt = require('bcryptjs');
const mongoose = require('../database/index');

const ItemCart = new mongoose.Schema({ id: String, idStore: String, amount: Number }, { noId: true });

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
    default: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  cpf: {
    type: String,
    required: false,
  },
  cart: [ItemCart],
});

UserSchema.pre('save', async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
});


const User = mongoose.model('User', UserSchema);


module.exports = User;
