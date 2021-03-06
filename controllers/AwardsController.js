import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"



export default class AwardsController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-award", this.getAllAward)
      .post("/new-award", this.addNewAward)
      .delete("/delete/:awardId", this.deleteByAwardId)
      .put("/update/:awardId", this.update)
  }

  async getAllAward(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Award.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the award!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewAward(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      req.body.username = username;
      console.log(req.body)
      dbContext.Award.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteByAwardId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return (res.status(401))

      await dbContext.Award.findByIdAndRemove({ username: thisUser, _id: req.params.awardId });

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
      let document = dbContext.Award.findByIdAndUpdate(req.params.awardId, req.body, { new: true });
      res.send(document);
    } catch (e) {
      next(e);
    }
  }
}