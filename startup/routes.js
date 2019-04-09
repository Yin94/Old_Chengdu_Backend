const meals = require('../routers/meals');
const cart = require('../routers/cart');
const auth = require('../routers/auth');
const errorHandler = require('../middleware/errorHandler');
const express = require('express');

function setUpRoutesAndStartUps(app) {
  app.use(express.json());
  app.use('/api/meals', meals);
  app.use('/api/auth', auth);
  app.use('/api/cart', cart);
  app.use(errorHandler);
}

module.exports = setUpRoutesAndStartUps;
