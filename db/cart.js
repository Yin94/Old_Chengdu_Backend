const mongoose = require('mongoose');
const Joi = require('joi');

//schema
const schema = new mongoose.Schema({
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'meals' },
  count: { type: Number },
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});
