import BaseController from "../utils/BaseController";
import { dbContext } from "../db/DbContext";
import express from "express";
import SessionsController from "../controllers/SessionsController";
import { validationService } from "../service/ValidationService";

import fs from "fs";
import { exec } from "child_process";

export default class WorksController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-work", this.getAllWork)
      .post("/new-work", this.addNewWork)
      .delete("/delete/:workId", this.deleteByWorkId)
      .put("/update/:workId", this.update);
  }

  async getAllWork(req, res, next) {
    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return res.status(401);

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Work.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the work!", documents);
        return res.send(documents);
      });

      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async addNewWork(req, res, next) {
    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return res.status(401);

      req.body.username = username;
      console.log(req.body);

      // creates the new work item
      dbContext.Work.create(req.body, function (err, document) {
        if (err) throw console.error(err);
        let workDocID = document._id;

        // add to the end of Profile workIndexArray
        // grab workIndexArray document
        dbContext.Profile.find({ username: username }, function (err, doc) {
          if (err) throw console.error(err);

          let currentIndexArray = doc[0].workIndexArray;
          let updatedIndexArray = currentIndexArray.concat(workDocID);

          dbContext.Profile.findOneAndUpdate(
            { username: username },
            { workIndexArray: updatedIndexArray },
            { new: true },
            function (err, doc) {
              console.log("updated doc: ", doc);
            }
          );
        });
        res.send(document);
      });

      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteByWorkId(req, res, next) {
    console.log("trigger");
    console.log(req.body);

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return res.status(401);

      await dbContext.Work.findByIdAndRemove({
        username: thisUser,
        _id: req.params.workId,
      });

      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    // res.status(200)
    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);

    try {
      let document = dbContext.Work.findByIdAndUpdate(
        req.params.workId,
        req.body,
        { new: true }
      );
      res.send(document);
    } catch (e) {
      next(e);
    }
  }
}
