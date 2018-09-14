const express = require("express");
const authMiddleware = require("../middlewares/auth");
const Store = require("../models/store");
const User = require("../models/user");
const router = express.Router();
router.use(authMiddleware);



router.get('/getItensByStore/:storeId', async (req, res) => {


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



module.exports = app => app.use("/store", router);