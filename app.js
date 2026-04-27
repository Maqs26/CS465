const express = require("express");
const path = require("path");

require("./app_api/controllers/db");

const apiRouter = require("./app_api/routes/index");
const mainRouter = require("./app_server/routes/index");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
