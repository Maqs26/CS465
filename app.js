const express = require("express");
const path = require("path");

require("./app_api/controllers/db");

const apiRouter = require("./app_api/routes/index");
const mainRouter = require("./app_server/routes/index");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
