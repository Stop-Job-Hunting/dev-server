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
    console.log("started get all work");
    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return res.status(401);

      console.log("validated user");

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Work.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        // console.log("found the work!", documents);
        console.log("sent find request to DB: ", documents);
        return res.send(documents);
      });

      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async addNewWork(req, res, next) {
    console.log("putting in new item");
    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return res.status(401);

      req.body.username = username;
      // console.log(req.body);

      console.log(`validated ${username}`);

      // creates the new work item
      dbContext.Work.create(req.body, function (err, document) {
        if (err) throw console.error(err);
        console.log("created document: ", document);
        res.send(document);
      });

      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteByWorkId(req, res, next) {
    // console.log("trigger");
    // console.log(req.body);

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
    console.log("the request is: ", req.body);
    console.log("the id is: ", req.params.workId);

    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);

    dbContext.Work.findByIdAndUpdate(
      req.params.workId,
      req.body,
      { new: true },
      (err, document) => {
        if (err) {
          throw err;
        }
        console.log(document);
      }
    );
  }
}
