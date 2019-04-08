const express = require('express');
const router = express.Router();
const { authMiddleWare } = require('../middleware/auth');
const { queryCart, createCart } = require('../db/cart');

//create
router.post('/', authMiddleWare, async (req, res) => {
  const uid = req.params.tokenPayload._id;

  const payload = req.body;
  const result = await createCart(uid, payload);
  res.send(result);
});
//query
router.get('/', authMiddleWare, async (req, res) => {
  const id = req.params.tokenPayload._id;
  const result = await queryCart(id);

  res.send(result);
});
module.exports = router;
