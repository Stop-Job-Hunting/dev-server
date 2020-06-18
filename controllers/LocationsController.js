import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class LocationsController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-location", this.getAllLocation)
      .post("/new-location", this.addNewLocation)
      .delete("/delete/:locationId", this.deleteByLocationId)
      .put("/update/:locationId", this.update)
  }

  async getAllLocation(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Location.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the location!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewLocation(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      req.body.username = username;
      console.log(req.body)
      dbContext.Location.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByLocationId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return (res.status(401))

      await dbContext.Location.findByIdAndRemove({ username: thisUser, _id: req.params.locationId });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    // res.status(200)
    let username = await validationService.validateUser(req);
    if (username === "") return (res.status(401))

    try {
      let document = dbContext.Location.findByIdAndUpdate(req.params.locationId, req.body, { new: true });
      res.send(document);
    } catch (e) {
      next(e);
    }
  }
}