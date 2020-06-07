import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import SessionsController from "../controllers/SessionsController"

import fs from "fs"
import { exec } from "child_process"

export default class WorksController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-work", this.getAllWork)
      .post("/new-work", this.addNewWork)
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


  // async getAllWork(req, res, next) {
  //   try {
  //     // Their particular username to store with the data
  //     // @ts-ignore
  //     const thisSession = new SessionsController()
  //     const username = await thisSession.validateUser(req, res, next);
  //     console.log("in get all work - user name is: ", username)

  //     // TODO:  if validateUser returns 401, does it come here?

  //     dbContext.Work.find({ username: username }, function (err, documents) {
  //       if (err) throw console.error(err);
  //       console.log("found the work!", documents);
  //       return res.send(documents);
  //     });

  //     res.status(200);

  //   } catch (error) {
  //     next(error)
  //   }
  // }

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

        res.status(200);
      });
    } catch (error) {
      next(error)
    }
  }

}