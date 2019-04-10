const mongoose = require('mongoose');
const config = require('config');

//mongodb
module.exports = (() => {
  if (!config.get('db')) console.log('no db specified!');
  console.log('db ulr:' + config.get('db'));
  mongoose
    .connect(config.get('db'), { useNewUrlParser: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('connection to DB failed:' + err));
})();
