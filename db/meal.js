const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  chineseName: { type: String, unique: true, required: true },
  price: { type: Number, required: true, min: 0 },
  img: { type: String, required: true },
  spiceDegree: { type: Number, min: 0, max: 5, required: true },
  monthlySaleCount: { type: Number, min: 0, required: true }
});

const Meal = mongoose.model('Meal', schema, 'Meal');

//C
async function createMeal(meal) {
  try {
    await meal.validate();
    const result = await Meal.create(meal);
    return result;
  } catch (error) {
    // console.log(error.errors);
    for (field in error.errors) {
      // get errors
      console.log(error.errors[field].message);
    }
  }
}
//R
async function getMeals(pageIndex = 0, pageSize = 12) {
  //skip and limit for pagination
  const meals = await Meal.find()
    .skip(pageSize * pageIndex)
    .limit(pageSize);
  return meals;
}

async function queryMeal(id) {
  const meal = await Meal.findById(id);
  return meal;
}
//U
async function updateMeal(doc) {
  const result = await Meal.updateOne({ _id: doc._id }, doc);
  console.log(result);
  return result;
}

//D
async function deleteMeal(_id) {
  const result = await Meal.findByIdAndDelete(_id);
  console.log(result);
  return result;
}
//

exports.Meal = Meal;
exports.getMeals = getMeals;
exports.queryMeal = queryMeal;
//
const pH = {
  name: 'Szechuan Potato',
  chineseName: '青椒土豆丝',
  price: 13,
  spiceDegree: 3,
  monthlySaleCount: 30,
  img: 'https://i.ytimg.com/vi/IKhAyGSpYrM/maxresdefault.jpg',
  __v: 0
};

const meal = new Meal(pH);
