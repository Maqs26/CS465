const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/main");

// Existing routes
router.get("/", ctrlMain.home);
router.get("/about", ctrlMain.about);
router.get("/contact", ctrlMain.contact);

// ADD THESE 👇
router.get("/travel", ctrlMain.travel);
router.get("/rooms", ctrlMain.rooms);
router.get("/meals", ctrlMain.meals);
router.get("/news", ctrlMain.news);

module.exports = router;