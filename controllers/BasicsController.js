import BaseController from "../utils/BaseController";
import { dbContext } from "../db/DbContext";
import express from "express";
import { validationService } from "../service/ValidationService";

import fs from "fs";
import { exec } from "child_process";

export default class BasicsController {
  constructor() {
    this.router = express
      .Router()
      .get("/all-basic", this.getAllBasic)
      .post("/new-basic", this.addNewBasic)
      .delete("/delete/:basicId", this.deleteByBasicId)
      .put("/update", this.update);
  }

  async getAllBasic(req, res, next) {
    console.log("trigger");
    // Their particular username to store with the data
    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);
    console.log(username);

    dbContext.Basic.find({ username: username }, function (err, documents) {
      if (err) throw console.error(err);
      console.log("found the basic!", documents);
      return res.send(documents);
    });
  }

  async addNewBasic(req, res, next) {
    try {
      // Their particular username to store with the data
      let username = await validationService.validateUser(req);
      if (username === "") return res.status(401);

      req.body.username = username;
      console.log("Entering addNewBasic - req.body is", req.body);

      dbContext.Basic.find({ username: username }, function (err, documents) {
        if (documents.length < 1) {
          console.log("create new basic record");
          dbContext.Basic.create(req.body, function (err, document) {
            if (err) throw console.error(err);
            console.log("created doc: ", document);
            // res.send(document);
            return res.send(document);
          });
        } else {
          console.log("Not new, update body with: ", req.body);
          dbContext.Basic.findOneAndUpdate(
            { username: username },
            req.body,
            { new: true },
            (err, document) => {
              if (err) throw err;
              console.log("Resulting document is: ", document);
              return res.send(document);
            }
          );
        }
        // console.log("found the basic!", documents);
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteByBasicId(req, res, next) {
    try {
      // Their particular username to store with the data
      let thisUser = await validationService.validateUser(req);
      if (thisUser === "") return res.status(401);

      await dbContext.Basic.findByIdAndRemove({
        username: thisUser,
        _id: req.params.basicId,
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

    dbContext.Basic.findOneAndUpdate(
      { username: username },
      req.body,
      { new: true },
      (err, document) => {
        if (err) throw err;
        console.log(document);
        return res.send(document);
      }
    );
  }
}
