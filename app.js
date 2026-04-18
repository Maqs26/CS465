

const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = 3000;

// Set view engine
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

// Static files (css, images)
app.use(express.static(path.join(__dirname)));

// Routes
const indexRouter = require("./app_server/routes/index");
const apiRouter = require("./app_api/routes/index");

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});