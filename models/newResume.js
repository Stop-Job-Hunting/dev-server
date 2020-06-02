import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Resume = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
    label: { type: String },
    picture: { type: String },
    phone: { type: String },
    website: { type: String },
    summary: { type: String },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
    countryCode: { type: String },
    region: { type: String },
    email: { type: String, required: true },

    // matches jsonresume.org schema from here on
    work: [{
      company: { type: String },
      position: { type: String },
      website: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      summary: { type: String },
      highlights: [
        { type: String }
      ]
    }],
    profiles: [{
      network: { type: String },
      username: { type: String },
      url: { type: String },
    }],
    volunteer: [{
      organization: { type: String },
      position: { type: String },
      website: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      summary: { type: String },
      highlights: [
        { type: String },
      ]
    }],
    education: [{
      institution: { type: String },
      area: { type: String },
      studyType: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      gpa: { type: String },
      courses: [
        { type: String }
      ]
    }],
    awards: [{
      title: { type: String },
      date: { type: String },
      awarder: { type: String },
      summary: { type: String }
    }],
    publications: [{
      name: { type: String },
      publisher: { type: String },
      releaseDate: { type: String },
      website: { type: String },
      summary: { type: String }
    }],
    skills: [{
      name: { type: String },
      level: { type: String },
      keywords: [{ type: String }]
    }],
    languages: [{
      language: { type: String },
      fluency: { type: String }
    }],
    interests: [{
      name: { type: String },
      keywords: [{ type: String }]
    }],
    references: [{
      name: { type: String },
      reference: { type: String }
    }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Resume;