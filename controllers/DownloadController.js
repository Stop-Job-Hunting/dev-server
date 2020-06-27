import { dbContext } from "../db/DbContext";
import express from "express";
import { validationService } from "../service/ValidationService";
import BuildJsonString from "../buildJsonString";
import fs from "fs";
import { exec } from "child_process"

export default class DownloadController {
  constructor() {
    this.router = express
      .Router()
      .get("/build-json", this.buildJSON)
      .get("/build-resume", this.buildResume)
      .get("/download-resume", this.downloadFile)
  }

  async buildJSON(req, res, next) {
    console.log("triggered request");
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
    console.log("parsed Doc: ", parsedDoc);
    fs.writeFile("resume.json", JSON.stringify(parsedDoc), (err) => {
      if (err) throw err;
      console.log("we wrote the file")
      // exec("hackmyresume BUILD resume.json", (err) => {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log("success");
      // });
    })

    return res.send(allItems);
  }

  async buildResume(req, res) {
    console.log("Triggered build resume")
    exec("hackmyresume BUILD resume.json", (err) => {
      if (err) {
        throw err;
      }
      console.log("success");
      const file = `${__dirname}/../out/resume.pdf.html`;
      res.download(file);
    });
  }

  async downloadFile(req, res) {

    const file = `${__dirname}/../out/resume.pdf.html`;
    res.download(file);
  }


}
