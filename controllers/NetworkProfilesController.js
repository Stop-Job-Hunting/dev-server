import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class NetworkProfileController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-networkprofile", this.getAllNetworkProfile)
      .post("/new-networkprofile", this.addNewNetworkProfile)
      .delete("/delete/:networkprofileId", this.deleteByNetworkProfileId)
      .put("/update/:networkprofileId", this.update)
  }

  async getAllNetworkProfile(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      // TODO:  if validateUser returns empty username, what to do

      dbContext.NetworkProfile.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the networkprofile!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewNetworkProfile(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      req.body.username = username;
      console.log(req.body)
      dbContext.NetworkProfile.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByNetworkProfileId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return (res.status(401))

      await dbContext.NetworkProfile.findByIdAndRemove({ username: thisUser, _id: req.params.networkprofileId });

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
      let document = dbContext.NetworkProfile.findByIdAndUpdate(req.params.networkprofileId, req.body, { new: true });
      res.send(document);
    } catch (e) {
      next(e);
    }
  }
}