const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/ibuild', { useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;
