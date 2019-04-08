const express = require('express');
const mongoose = require('mongoose');
const app = express();
const meals = require('./routers/meals');
const auth = require('./routers/auth');
require('./db/user');
app.use(express.json());
app.use('/api/meals', meals);
app.use('/api/auth', auth);
//mongodb
mongoose
  .connect('mongodb://localhost/lao-chengdu', { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err.message));
//
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on PORT:${port}`);
});
