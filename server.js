import database from "./db/DbConfig";
import { dbContext } from "./db/DbContext";
import CLIENTURL from "./constants"


const express = require("express");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const BuildJsonString = require("./buildJsonString");


const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: CLIENTURL }));
app.use(express.json());

const port = process.env.PORT || 3001;

// Connect to the database here
database.connect();

// Register our controllers here
import SessionsController from "./controllers/SessionsController";
import ResumesController from "./controllers/ResumesController";
import AwardsController from "./controllers/AwardsController";
import EducationsController from "./controllers/EducationsController";
import InterestsController from "./controllers/InterestsController";
import LanguagesController from "./controllers/LanguagesController";
import PublicationsController from "./controllers/PublicationsController";
import ReferencesController from "./controllers/ReferencesController";
import SkillsController from "./controllers/SkillsController";
import VolunteersController from "./controllers/VolunteersController";
import WorksController from "./controllers/WorksController";

app.use("/sessions", new SessionsController().router)
app.use("/resumes", new ResumesController().router)
app.use("/awards", new AwardsController().router)
app.use("/educations", new EducationsController().router)
app.use("/interests", new InterestsController().router)
app.use("/languages", new LanguagesController().router)
app.use("/publications", new PublicationsController().router)
app.use("/references", new ReferencesController().router)
app.use("/skills", new SkillsController().router)
app.use("/volunteers", new VolunteersController().router)
app.use("/works", new WorksController().router)

app.get("/", (req, res) => {
  res.status(200)
  res.send("I'm alive")
  res.end()
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
