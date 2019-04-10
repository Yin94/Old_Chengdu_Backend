const mongoose = require('mongoose');
const config = require('config');
//mongodb
module.exports = (() => {
  if (!config.get('db')) {
    console.log('no db specified!');
    process.exit(1);
  }
  console.log('trying to connect to db:' + config.get('db'));
  mongoose
    .connect(config.get('db'))
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('connection to DB failed:' + err));
})();
