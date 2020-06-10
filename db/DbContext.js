import mongoose from "mongoose";
import Profile from "../models/Profile";
import Session from "../models/Session";
import Resume from "../models/Resume";
import Work from "../models/Work";
import Award from "../models/Award";
import Education from "../models/Education";
import Interest from "../models/Interest";
import Language from "../models/Language";
import Publication from "../models/Publication";
import Reference from "../models/Reference";
import Skill from "../models/Skill";
import Volunteer from "../models/Volunteer";

class DbContext {
  Profile = mongoose.model("Profile", Profile);
  Session = mongoose.model("Session", Session);
  Resume = mongoose.model("Resume", Resume);

  Award = mongoose.model("Award", Award);
  Education = mongoose.model("Education", Education);
  Interest = mongoose.model("Interest", Interest);
  Language = mongoose.model("Language", Language);
  Publication = mongoose.model("Publication", Publication);
  Reference = mongoose.model("Reference", Reference);
  Skill = mongoose.model("Skill", Skill);
  Volunteer = mongoose.model("Volunteer", Volunteer);
  Work = mongoose.model("Work", Work);


}

export const dbContext = new DbContext();
