const path = require("path");

let mongoose;
try {
  mongoose = require("mongoose");
} catch (err) {
  mongoose = null;
}

if (mongoose) {
  const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    length: Number,
    start: Date,
    resort: String,
    perPerson: Number,
    image: String,
    description: String
  });

  if (!mongoose.models.trips) {
    mongoose.model("trips", tripSchema);
  }

  module.exports = mongoose.model("trips");
} else {
  // Fallback data source with the same FIND/FINDONE-style contract.
  const trips = require(path.join(__dirname, "..", "..", "data", "trips.json"));

  module.exports = {
    find: async () => trips,
    findOne: async (query) => trips.find((trip) => trip.code === query.code) || null
  };
}
