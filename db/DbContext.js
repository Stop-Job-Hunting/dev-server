import mongoose from "mongoose";
import Profile from "../models/Profile";
import Session from "../models/Session";
import Resume from "../models/Resume";


class DbContext {
  Profile = mongoose.model("Profile", Profile);
  Session = mongoose.model("Session", Session);

  Resume = mongoose.model("Resume", Resume);

}

export const dbContext = new DbContext();
