const Trip = require('../../app_api/models/trips');

const home = (req, res) => {
  res.render('index', { title: 'Home' });
};

const about = (req, res) => {
  res.render('about', { title: 'About' });
};

const contact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

const travel = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();

    res.render('travel', {
      title: 'Travel',
      trips,
    });
  } catch (err) {
    res.status(500).render('travel', {
      title: 'Travel',
      trips: [],
      error: 'Unable to load trips from database.',
    });
  }
};

const rooms = (req, res) => {
  res.render('rooms', { title: 'Rooms' });
};

const meals = (req, res) => {
  res.render('meals', { title: 'Meals' });
};

const news = (req, res) => {
  res.render('news', { title: 'News' });
};

module.exports = {
  home,
  about,
  contact,
  travel,
  rooms,
  meals,
  news,
};
