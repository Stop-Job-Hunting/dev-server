import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"

import fs from "fs"
import { exec } from "child_process"

export default class SkillsController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-skill", this.getAllSkill)
      .post("/new-skill", this.addNewSkill)
      .delete("/delete/:skillId", this.deleteBySkillId)
      .put("/update/:skillId", this.update)
  }

  async getAllSkill(req, res, next) {
    try {

      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      // TODO:  if validateUser returns empty username, what to do

      dbContext.Skill.find({ username: username }, function (err, documents) {
        if (err) throw console.error(err);
        console.log("found the skill!", documents);
        return res.send(documents);
      });

      res.status(200);

    } catch (error) {
      next(error)
    }
  }

  async addNewSkill(req, res, next) {

    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return (res.status(401))

      req.body.username = username;
      console.log(req.body)
      dbContext.Skill.create(req.body,
        function (err, document) {
          if (err) throw console.error(err);
          console.log(document)
          res.send(document);
        });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }

  async deleteBySkillId(req, res, next) {

    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return (res.status(401))

      await dbContext.Award.findByIdAndRemove({ username: thisUser, _id: req.params.skillId });

      res.status(200);
    } catch (error) {
      next(error)
    }
  }
  //TODO: fix this

  // async update(req, res, next) {
  //   // res.status(200)
  //   let username = await validationService.validateUser(req);
  //   if (username === "") return (res.status(401))

  //   try {
  //     let document = dbContext.Skill.findByIdUpdate(req.params.skillId, req.body, { new: true });
  //     res.send(document);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}