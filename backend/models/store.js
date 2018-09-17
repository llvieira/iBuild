const mongoose = require("../database/index");
const item = require("./item");
const bcrypt = require("bcryptjs");

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    storage: [item],
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
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});
const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;