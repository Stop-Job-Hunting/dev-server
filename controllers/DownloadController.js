import { dbContext } from "../db/DbContext";
import express from "express";
import { validationService } from "../service/ValidationService";
import BuildJsonString from "../buildJsonString";
import fs from "fs";
import { exec } from "child_process";
import mkdirp from "mkdirp";

export default class DownloadController {
  constructor() {
    this.router = express
      .Router()
      .get("/build-json", this.buildJSON)
      .get("/build-resume", this.buildResume);
  }

  async buildJSON(req, res, next) {
    // Their particular username to store with the data
    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);

    // TODO:  if validateUser returns empty username, what to do

    let basicItems = await dbContext.Basic.find({ username: username }).exec();

    let workItems = await dbContext.Work.find({ username: username }).exec();

    let educationItems = await dbContext.Education.find({
      username: username,
    }).exec();

    let allItems = {
      basics: basicItems[0],
      work: workItems,
      education: educationItems,
    };

    let parsedDoc = BuildJsonString(allItems);

    mkdirp(`users/${username}`, (err) => {
      if (err) console.log(err);
      fs.writeFile(
        `users/${username}/resume.json`,
        JSON.stringify(parsedDoc),
        (err) => {
          if (err) throw err;
        }
      );
    });
    return res.send(allItems);
  }

  async buildResume(req, res) {
    // Their particular username to store with the data
    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);

    exec(
      `hackmyresume BUILD users/${username}/resume.json users/${username}/out/resume.all`,
      (err) => {
        if (err) {
          console.log("buildResumeError: ", err);
        }
        console.log("success");

        console.log("send file");
        const file = `${__dirname}/../users/${username}/out/resume.pdf.html`;
        res.download(file);
      }
    );
  }
}
