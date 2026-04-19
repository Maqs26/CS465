const Trip = require('../models/trips');

const sendJSONresponse = (res, status, content) => {
  res.status(status).json(content);
};

const readTrips = async (_req, res) => {
  try {
    const trips = await Trip.find({});
    return sendJSONresponse(res, 200, trips);
  } catch (err) {
    return sendJSONresponse(res, 500, err);
  }
};

const readTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });

    if (!trip) {
      return sendJSONresponse(res, 404, { message: 'tripCode not found' });
    }

    return sendJSONresponse(res, 200, trip);
  } catch (err) {
    return sendJSONresponse(res, 500, err);
  }
};

const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      name: req.body.name,
      code: req.body.code,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });

    return sendJSONresponse(res, 201, trip);
  } catch (err) {
    return sendJSONresponse(res, 400, err);
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        name: req.body.name,
        code: req.body.code,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return sendJSONresponse(res, 404, { message: 'tripCode not found' });
    }

    return sendJSONresponse(res, 200, trip);
  } catch (err) {
    return sendJSONresponse(res, 400, err);
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });

    if (!trip) {
      return sendJSONresponse(res, 404, { message: 'tripCode not found' });
    }

    return sendJSONresponse(res, 204, null);
  } catch (err) {
    return sendJSONresponse(res, 500, err);
  }
};

module.exports = {
  readTrips,
  readTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
