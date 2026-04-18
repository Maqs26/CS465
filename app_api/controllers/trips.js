const trips = require("../data/trips.json");

const tripsList = (req, res) => {
  res.status(200).json(trips);
};

const tripsFindByCode = (req, res) => {
  const tripCode = req.params.tripCode;

  if (!tripCode) {
    return res.status(400).json({ message: "tripCode is required" });
  }

  const trip = trips.find((entry) => entry.code.toLowerCase() === tripCode.toLowerCase());

  if (!trip) {
    return res.status(404).json({ message: `No trip found for code ${tripCode}` });
  }

  return res.status(200).json(trip);
};

module.exports = {
  tripsList,
  tripsFindByCode,
};
