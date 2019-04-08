const express = require('express');
const router = express.Router();
const {
  updateUser,
  queryUserByUserNameAndPswd,
  createUser
} = require('../db/user');
//get
router.post('/signup', async (req, res) => {
  //   const user = req.body.user || req.body;
  const user = req.body;
  createUser(user);
  res.send('succeed');
});
//query
router.get('/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await queryUserByUserNameAndPswd(username, password);
  const { _id, email, phone } = user;
  res.send({ username, _id, email, phone });
});

module.exports = router;
