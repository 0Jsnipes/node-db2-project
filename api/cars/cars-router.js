const express = require('express');
const Cars = require('./cars-model');
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware'); // Ensure correct import path

const router = express.Router();

// [GET] /api/cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/cars/:id
router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/cars
router.post(
  '/',
  checkCarPayload, // Make sure this is defined
  checkVinNumberValid, // Ensure this is defined
  checkVinNumberUnique, // Ensure this is defined
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
