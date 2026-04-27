let mongoose;

try {
  mongoose = require('mongoose');
} catch (_err) {
  throw new Error('Mongoose is required. Run `npm install mongoose` before starting the app.');
}

const tripsSeed = require('../../data/trips.json');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const Trip = require('../models/trips');
require('../models/users');

const seedTrips = async () => {
  const shouldSeed = (process.env.TRAVLR_SEED_DATA || 'true').toLowerCase() === 'true';
  if (!shouldSeed) return;

  const existingCount = await Trip.countDocuments();
  if (existingCount > 0) return;

  await Trip.insertMany(tripsSeed);
  console.log(`Seeded ${tripsSeed.length} trips into MongoDB`);
};

mongoose.connection.once('open', () => {
  seedTrips().catch((err) => {
    console.log('Trip seed failed:', err.message);
  });
});
