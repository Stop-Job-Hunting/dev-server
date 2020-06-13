import mongoose from "mongoose";
import Profile from "../models/Profile";
import Session from "../models/Session";
import Resume from "../models/Resume";

import Award from "../models/Award";
import Basic from "../models/Basic";
import Education from "../models/Education";
import Interest from "../models/Interest";
import Language from "../models/Language";
import Location from "../models/Location";
import NetworkProfile from "../models/NetworkProfile";
import Publication from "../models/Publication";
import Reference from "../models/Reference";
import Skill from "../models/Skill";
import User from "../models/User"
import Volunteer from "../models/Volunteer";
import Work from "../models/Work";

class DbContext {
  Profile = mongoose.model("Profile", Profile);
  Session = mongoose.model("Session", Session);
  Resume = mongoose.model("Resume", Resume);

  Award = mongoose.model("Award", Award);
  Basic = mongoose.model("Basic", Basic)
  Education = mongoose.model("Education", Education);
  Interest = mongoose.model("Interest", Interest);
  Language = mongoose.model("Language", Language);
  Location = mongoose.model("Location", Location);

  NetworkProfile = mongoose.model("NetworkProfile", NetworkProfile);
  Publication = mongoose.model("Publication", Publication);
  Reference = mongoose.model("Reference", Reference);
  Skill = mongoose.model("Skill", Skill);
  User = mongoose.model("User", User);
  Volunteer = mongoose.model("Volunteer", Volunteer);
  Work = mongoose.model("Work", Work);


}

export const dbContext = new DbContext();
