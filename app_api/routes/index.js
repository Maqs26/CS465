const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const auth = require('../middleware/auth');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.route('/trips').get(ctrlTrips.readTrips).post(auth, ctrlTrips.createTrip);

router
  .route('/trips/:tripCode')
  .get(ctrlTrips.readTrip)
  .put(auth, ctrlTrips.updateTrip)
  .delete(auth, ctrlTrips.deleteTrip);

module.exports = router;
