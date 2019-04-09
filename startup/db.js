const mongoose = require('mongoose');
//mongodb
module.exports = (() => {
  mongoose
    .connect('mongodb://localhost/lao-chengdu', { useNewUrlParser: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err.message));
})();
