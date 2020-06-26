import { dbContext } from "../db/DbContext";
import express from "express";
import { validationService } from "../service/ValidationService";

export default class DownloadController {
  constructor() {
    this.router = express.Router().get("", this.getAll);
  }

  async getAll(req, res, next) {
    console.log("triggered request");
    // Their particular username to store with the data
    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);

    // TODO:  if validateUser returns empty username, what to do

    let basicItems = await dbContext.Basic.find({ username: username }).exec();

    let workItems = await dbContext.Work.find({ username: username }).exec();

    let educationItems = await dbContext.Education.find({
      username: username,
    }).exec();

    let allItems = {
      basics: basicItems[0],
      work: workItems,
      education: educationItems,
    };

    console.log("combined docs: ", allItems);

    return res.send(allItems);
    res.status(200);
  }
}
