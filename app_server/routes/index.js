const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/main");

router.get("/", ctrlMain.home);
router.get("/about", ctrlMain.about);
router.get("/contact", ctrlMain.contact);

module.exports = router;