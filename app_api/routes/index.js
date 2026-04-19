const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

router
  .route('/trips')
  .get(ctrlTrips.readTrips)
  .post(ctrlTrips.createTrip);

router
  .route('/trips/:tripCode')
  .get(ctrlTrips.readTrip)
  .put(ctrlTrips.updateTrip)
  .delete(ctrlTrips.deleteTrip);

module.exports = router;
