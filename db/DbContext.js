import mongoose from "mongoose";
import Profile from "../models/Profile";
import Session from "../models/Session";
import Resume from "../models/Resume";
import Work from "../models/Work";


class DbContext {
  Profile = mongoose.model("Profile", Profile);
  Session = mongoose.model("Session", Session);

  Resume = mongoose.model("Resume", Resume);

  Work = mongoose.model("Work", Work);

}

export const dbContext = new DbContext();
