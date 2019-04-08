const mongoose = require('mongoose');
const Joi = require('joi');

//schema
const schema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
  count: { type: Number }
});

const Cart = mongoose.model('Cart', schema, 'Cart');
//addCart
async function createCart(uid, payload) {
  //validation
  try {
    await validatePayload({ uid, ...payload });
    const result = await Cart.create({ uid, ...payload });
    return result;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}
//queryCart
async function queryCart(uid) {
  const result = await Cart.find({ uid }).populate(
    'mealId',
    'name chineseName'
  );
  return result;
}

exports.queryCart = queryCart;
exports.createCart = createCart;

async function validatePayload(payload) {
  const schema = {
    uid: Joi.objectId().required(),
    mealId: Joi.objectId().required(),
    count: Joi.number().required()
  };
  return Joi.validate(payload, schema);
}
