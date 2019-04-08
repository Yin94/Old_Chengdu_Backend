const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 25 },
  email: { type: String, required: true, minlength: 5, maxlength: 25 },
  phone: { type: String, required: true, maxlength: 10, minlength: 10 },
  password: { type: String, required: true, maxlength: 25, minlength: 5 },
  //TODO: add profile pic
  profilePic: { type: String }
});
const User = mongoose.model('User', schema, 'User');

//create
async function createUser(user) {
  const usr = new User(user);
  try {
    await usr.validate();
    return await User.create(user);
  } catch (error) {
    if (error.errors)
      for (field in error.errors) console.log(error.errors[field].message);
    else console.log(error.message);
  }
}
//query
async function queryUserById(id) {
  try {
    return await User.findById(id);
  } catch (error) {
    for (field in error.errors) console.log(error.errors[field].message);
  }
}
//signin
async function queryUserByUserNameAndPswd(userName) {
  try {
    const user = await User.findOne({ username: userName });

    return user;
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
exports.queryUserByUserNameAndPswd = queryUserByUserNameAndPswd;
exports.createUser = createUser;
