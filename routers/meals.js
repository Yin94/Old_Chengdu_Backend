const express = require('express');
const router = express.Router();
const authority = require('../middleware/permission');
const authMiddleWare = require('../middleware/auth');
const { getMeals, queryMeal, updateMeal, createMeal } = require('../db/meal');
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
//update
router.put('/', [authMiddleWare, authority], async (req, res) => {
  const meal = req.body;
  const result = await updateMeal(meal);
  res.send(result);
});
//addMeal
router.post('/', [authMiddleWare, authority], async (req, res) => {
  const meal = req.body;
  const result = await createMeal(meal);
  if (result instanceof String) res.send(result);
  else res.send(result);
});
module.exports = router;
