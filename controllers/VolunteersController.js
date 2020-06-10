import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class VolunteersController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-volunteer", this.getAllVolunteer)
      .post("/new-volunteer", this.addNewVolunteer)
      .delete("/delete/:volunteerId", this.deleteByVolunteerId)
  }

  async getAllVolunteer(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Volunteer.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the volunteer!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewVolunteer(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);

      req.body.username = username;
      console.log(req.body)
      dbContext.Volunteer.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByVolunteerId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);

      await dbContext.Award.findByIdAndRemove({ username: thisUser, _id: req.params.volunteerId });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }
}