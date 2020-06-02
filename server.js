import database from "./db/DbConfig";
import { dbContext } from "./db/DbContext";


const express = require("express");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const BuildJsonString = require("./buildJsonString");

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

const port = 3001;

// Connect to the database here
database.connect();

// Register our controllers here
import SessionsController from "../server/controllers/SessionsController"
import ResumesController from "./controllers/ResumesController";
app.use("/sessions", new SessionsController().router)
app.use("/resumes", new ResumesController().router)


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
