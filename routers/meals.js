const express = require('express');
const router = express.Router();
const { getMeals, queryMeal } = require('../db/meal');
//get
router.get('/', async (req, res) => {
  const pageIndex = req.query.pageIndex;
  const result = await getMeals(pageIndex);
  res.send(result);
});
//query
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await queryMeal(id);
  res.send(result);
});
module.exports = router;
