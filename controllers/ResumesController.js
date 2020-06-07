import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import buildJsonString from "../buildJsonString"
import fs from "fs"
import { exec } from "child_process"


export default class ResumesController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getResume)
      .get("/build-json", this.buildJSON)
      .get("/build-resume", this.buildResume)
      .get("/all-work", this.getAllWork)
      .post("", this.createResume)
      .post("/new-work", this.addNewWork)
  }

  async getResume(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      await dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        // Their particular username to store with the data
        // @ts-ignore
        const username = session.username;
        req.body.username = username;
        dbContext.Resume.findOne({ username: username }, function (err, document) {
          if (err) throw console.error(err);
          console.log("found the resume!", document);
          return res.send(document);
        });

        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }

  async getAllWork(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      await dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        // Their particular username to store with the data
        // @ts-ignore
        const username = session.username;
        req.body.username = username;
        dbContext.Work.find({ username: username }, function (err, documents) {
          if (err) throw console.error(err);
          console.log("found the work!", documents);
          return res.send(documents);
        });

        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }
  async buildJSON(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      await dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        // Their particular username to store with the data
        // @ts-ignore
        const username = session.username;
        req.body.username = username;
        dbContext.Resume.findOne({ username: username }, function (err, document) {
          if (err) throw console.error(err);
          console.log("found the resume!", buildJsonString(document));
          fs.writeFile("resume.json", buildJsonString(document), (err) => {
            if (err) throw err;
            console.log("file has been written");
            exec("hackmyresume BUILD resume.json", (err) => {
              if (err) {
                throw err;
              }
              console.log("success");
            });
            console.log("did this happen")
          });
          return res.send(document);
        });

        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }

  async buildResume(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      await dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        exec("hackmyresume BUILD resume.json", (err) => {
          if (err) {
            throw err;
          }
          console.log("success");
        });
        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }


  async createResume(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
        console.log(session);
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        // Their particular username to store with the data
        // @ts-ignore
        const username = session.username;
        req.body.username = username;
        dbContext.Resume.findOneAndUpdate(
          { username: username },
          req.body,
          function (err, document) {
            if (err) throw console.error(err);

            if (!document) {
              dbContext.Resume.create(req.body);
            }
          }
        );

        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }

  async addNewWork(req, res, next) {
    console.log(req.body)
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      dbContext.Session.findOne({ token: isThereToken }, function (err, session) {

        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        // Their particular username to store with the data
        // @ts-ignore
        const username = session.username;
        req.body.username = username;
        console.log(req.body)
        dbContext.Work.create(req.body,
          function (err, document) {
            if (err) throw console.error(err);
            console.log(document)
          });

        // dbContext.Work.findOneAndUpdate(
        //   { username: username },
        //   { work: req.body },
        //   { new: true },
        //   function (err, document) {
        //     if (err) throw console.error(err);

        //     // add the new work item to the document and then
        //     // update the Resume 
        //     console.log("The current resume is: ", document)
        //     if (!document) {
        //       dbContext.Resume.create(req.body);
        //     }
        //   }
        // );

        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }
}