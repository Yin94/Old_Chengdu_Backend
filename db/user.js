const mongoose = require('mongoose');
const Joi = require('joi');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 },
  phone: { type: String, required: true, maxlength: 10, minlength: 10 },
  permission: { type: Number, default: 0 }
  //TODO: add profile pic
  // profilePic: { type: String }
});
schema.methods.genAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, permission: this.permission },
    config.get('jwtPrivateKey')
  );
  return token;
};
const User = mongoose.model('User', schema, 'User');
async function hashPswd(pswd) {
  const salt = await brcypt.genSalt(10);
  const result = await brcypt.hash(pswd, salt);

  return result;
}

//create
async function createUser(user) {
  const usr = new User(user);
  try {
    await usr.validate();
    usr.password = await hashPswd(usr.password);
    return await User.create(usr);
  } catch (error) {
    if (error.errors)
      for (field in error.errors) console.log(error.errors[field].message);
    else {
      return error;
    }
  }
}
//query
async function queryUserById(id) {
  try {
    const doc = await User.findById(id).select('-password');
    return doc;
  } catch (error) {
    for (field in error.errors) console.log(error.errors[field].message);
  }
}
//signin
async function queryUserByUserName(userName) {
  try {
    const doc = await User.findOne({ username: userName });

    return doc;
  } catch (error) {
    for (field in error.errors) console.log(error.errors[field].message);
  }
}
//delete
async function updateUser(user) {
  const result = await User.updateOne({ _id: user._id }, user);
  console.log(result);
  return result;
}
//
exports.updateUser = updateUser;
exports.queryUserByUserName = queryUserByUserName;
exports.createUser = createUser;
exports.User = User;
exports.queryUserById = queryUserById;
