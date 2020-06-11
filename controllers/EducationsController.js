import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class EducationsController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-education", this.getAllEducation)
      .post("/new-education", this.addNewEducation)
      .delete("/delete/:educationId", this.deleteByEducationId)
  }

  async getAllEducation(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Education.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the education!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewEducation(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      req.body.username = username;
      console.log(req.body)
      dbContext.Education.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByEducationId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return (res.status(401))

      await dbContext.Education.findByIdAndRemove({ username: thisUser, _id: req.params.educationId });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }
}