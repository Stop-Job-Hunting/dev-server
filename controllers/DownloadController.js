import { dbContext } from "../db/DbContext";
import express from "express";
import { validationService } from "../service/ValidationService";
import BuildJsonString from "../buildJsonString";
import fs from "fs";
import { exec } from "child_process";
import mkdirp from "mkdirp";
import pdfFrom from "pdf-from";

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
    console.log("Triggered build resume");
    // Their particular username to store with the data
    let username = await validationService.validateUser(req);
    console.log("username: ", username);
    if (username === "") return res.status(401);

    // get the template that the user wants to use
    dbContext.Basic.find({ username: username }, (err, doc) => {
      if (err) console.log(err);
      // console.log("Tem", doc[0].template);

      let templateName = doc[0].template;
      console.log("templateName: ", templateName);

      // -t node_modules/${templateName}
      exec(
        `hackmyresume BUILD users/${username}/resume.json TO users/${username}/out/resume.all ${templateName}`,
        (err, output) => {
          console.log(output);
          if (err) {
            console.log("buildResumeError: ", err);
          }

          let applicationPdf;

          fs.readFile(
            `users/${username}/out/resume.pdf.html`,
            "utf8",
            async (err, data) => {
              if (err) {
                console.log(err);
              }
              applicationPdf = await pdfFrom.html(data);

              if (applicationPdf && Buffer.isBuffer(applicationPdf)) {
                //   res.type("application/pdf");
                //   res.download(applicationPdf);
                fs.writeFile(
                  `users/${username}/resume.pdf`,
                  applicationPdf,
                  (err) => {
                    const file = `${__dirname}/../users/${username}/resume.pdf`;
                    res.download(file);
                  }
                );
              } else {
                res.status(404).send("PDF not found");
              }
            }
          );

          // console.log("success");

          // console.log("send file");
          // const file = `${__dirname}/../users/${username}/out/resume.pdf`;
          // res.download(file);
        }
      );
    });
  }
}
