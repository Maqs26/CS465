const express = require("express");
const router = express.Router();
const ctrlTrips = require("../controllers/trips");

router.get("/trips", ctrlTrips.readTrips);
router.get("/trips/:tripCode", ctrlTrips.readTrip);

module.exports = router;
