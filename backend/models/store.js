const mongoose = require("../database/index");
const bcrypt = require("bcryptjs");

//TODO acrescentar mais atributos no item da loja
var item = new mongoose.Schema({img: String, title: String, value: Number, delivery: Boolean}, {noId: true});

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    storage:[item],
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    cnpj: {
        type: String,
        required: true
    }
});

StoreSchema.pre('save', async function (next) {
    if(this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});
const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;