const path = require('path');

let mongoose;
try {
  mongoose = require('mongoose');
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
    description: String,
  });

  if (!mongoose.models.trips) {
    mongoose.model('trips', tripSchema);
  }

  module.exports = mongoose.model('trips');
} else {
  // Fallback data source with the same Mongoose-style contract.
  const trips = require(path.join(__dirname, '..', '..', 'data', 'trips.json'));

  const clone = (trip) => (trip ? { ...trip } : null);
  const indexOfCode = (code) => trips.findIndex((trip) => trip.code === code);

  module.exports = {
    find: async () => trips.map(clone),
    findOne: async (query) => clone(trips.find((trip) => trip.code === query.code) || null),
    create: async (doc) => {
      const newTrip = clone(doc);
      trips.push(newTrip);
      return clone(newTrip);
    },
    findOneAndUpdate: async (query, doc) => {
      const index = indexOfCode(query.code);
      if (index === -1) {
        return null;
      }

      trips[index] = { ...trips[index], ...doc };
      return clone(trips[index]);
    },
    findOneAndDelete: async (query) => {
      const index = indexOfCode(query.code);
      if (index === -1) {
        return null;
      }

      const [deleted] = trips.splice(index, 1);
      return clone(deleted);
    },
  };
}
