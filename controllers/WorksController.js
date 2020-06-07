import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import SessionsController from "../controllers/SessionsController"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class WorksController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-work", this.getAllWork)
      .post("/new-work", this.addNewWork)
      .delete("/delete/:workId", this.deleteByWorkId)
  }



  async getAllWork(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Work.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the work!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewWork(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);

      req.body.username = username;
      console.log(req.body)
      dbContext.Work.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByWorkId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);

      await dbContext.Work.findByIdAndRemove({ username: thisUser, _id: req.params.workId });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }
}


