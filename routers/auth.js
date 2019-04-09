const express = require('express');
const router = express.Router();
const brcypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../middleware/auth');

const jwtPrivateKey = config.get('jwtPrivateKey');
const {
  updateUser,
  queryUserByUserName,
  queryUserById,
  createUser,
  User
} = require('../db/user');
//singup
router.post('/signup', async (req, res) => {
  //user Joi validate here;
  const user = req.body;
  const result = await createUser(user);

  if (result instanceof Error) res.send(result.message);
  else {
    const token = result.genAuthToken();
    res.send({ id: result._id, token });
  }
});

//signin
router.post('/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await queryUserByUserName(username);
  const permission = await brcypt.compare(password, user.password);
  if (permission) {
    const { _id, email, phone } = user;

    const token = user.genAuthToken();
    res.send({ id: user._id, token });
  } else {
    res.status(400).send('Invalid email address or password');
  }
});
//get currentUser
router.get('/current-user', authMiddleWare, async (req, res) => {
  const uid = req.params.tokenPayload._id;
  console.log(uid);
  const user = await queryUserById(uid);
  res.send(user);
});
module.exports = router;
