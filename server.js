console.log("built server server.js");

import database from "./db/DbConfig";
import { CLIENTURL } from "./constants";

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: CLIENTURL }));
app.use(function (req, res, next) {
  console.log("url: ", req.url, "method: ", req.method);
  next();
});
app.use(express.json());

const port = process.env.PORT || 3001;

// Connect to the database here
database.connect();

// Register our controllers here
import SessionsController from "./controllers/SessionsController";
import AwardsController from "./controllers/AwardsController";
import BasicsController from "./controllers/BasicsController";
import EducationsController from "./controllers/EducationsController";
import InterestsController from "./controllers/InterestsController";
import LanguagesController from "./controllers/LanguagesController";
import PublicationsController from "./controllers/PublicationsController";
import ReferencesController from "./controllers/ReferencesController";
import VolunteersController from "./controllers/VolunteersController";
import WorksController from "./controllers/WorksController";
import DownloadController from "./controllers/DownloadController";

app.use("/sessions", new SessionsController().router);
app.use("/awards", new AwardsController().router);
app.use("/basics", new BasicsController().router);
app.use("/educations", new EducationsController().router);
app.use("/interests", new InterestsController().router);
app.use("/languages", new LanguagesController().router);
app.use("/publications", new PublicationsController().router);
app.use("/references", new ReferencesController().router);
app.use("/volunteers", new VolunteersController().router);
app.use("/works", new WorksController().router);
app.use("/downloads", new DownloadController().router);

app.get("/", (req, res) => {
  res.status(200);
  res.send("I'm alive");
  res.end();
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
