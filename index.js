const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const meals = require('./routers/meals');
const cart = require('./routers/cart');
const auth = require('./routers/auth');
const { authMiddleWare } = require('./middleware/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: laochengdu_jwtPrivateKey not defined!');
  process.exit(1);
}
console.log('JwtPrivateKey successfully configured');
//middlewares
app.use(express.json());

app.use('/api/meals', meals);
app.use('/api/auth', auth);
app.use('/api/cart', cart);
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
