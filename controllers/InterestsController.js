import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class InterestsController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-interest", this.getAllInterest)
      .post("/new-interest", this.addNewInterest)
      .delete("/delete/:interestId", this.deleteByInterestId)
  }

  async getAllInterest(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Interest.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the interest!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewInterest(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);

      req.body.username = username;
      console.log(req.body)
      dbContext.Interest.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByInterestId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);

      await dbContext.Award.findByIdAndRemove({ username: thisUser, _id: req.params.interestId });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }
}