import { dbContext } from "../db/DbContext"
import express from "express"
import { validationService } from "../service/ValidationService"


export default class DownloadController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
  }

  async getAll(req, res, next) {

    // Their particular username to store with the data
    let username = await validationService.validateUser(req);
    if (username === "") return (res.status(401))

    // TODO:  if validateUser returns empty username, what to do

    let allItems = []
    dbContext.Basic.find({ username: username }, function (err, documents) {
      if (err) throw console.error(err);
      allItems.push(documents)
    });

    dbContext.Work.find({ username: username }, function (err, documents) {
      if (err) throw console.error(err);
      allItems.push(documents)
    });

    dbContext.Education.find({ username: username }, function (err, documents) {
      if (err) throw console.error(err);
      allItems.push(documents)
    });

    return res.send(allItems)
    res.status(200);

  }

}