let mongoose;

try {
  mongoose = require('mongoose');
} catch (_err) {
  throw new Error('Mongoose is required. Run `npm install mongoose` before using Trip model.');
}

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

module.exports = mongoose.models.trips || mongoose.model('trips', tripSchema);
