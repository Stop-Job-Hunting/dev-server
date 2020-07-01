import BaseController from "../utils/BaseController";
import { dbContext } from "../db/DbContext";
import express from "express";
import { validationService } from "../service/ValidationService";
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const COOKIE_OPTIONS = {
  httpOnly: true,
  domain: "localhost",
  secure: false,
  path: "/",
  // 30 days
  expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 30),
};

export default class SessionsController {
  constructor() {
    this.router = express
      .Router()
      .get("/logout", this.logout)
      .get("/am-i-logged-in", this.amILoggedIn)
      .post("/login", this.login)
      .post("/register", this.register)
      .post("/update-progress", this.updateProgress);
  }

  async logout(req, res, next) {
    try {
      const token = req.cookies["session-token"];

      await dbContext.Session.findOneAndUpdate(
        { token: token },
        { loggedIn: false },
        function (err, session) {
          if (err) {
            res.status(401);
            throw console.error(err);
          }
          console.log(session);
        }
      );

      res.clearCookie("session-token");
      res.send("logout");
      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      // grab username from database
      //TODO:  use the User model instead of Profile
      dbContext.User.findOne({ username: username }, function (err, loginData) {
        if (err) throw console.error(err);

        if (!loginData) {
          return res.status(401).send("User doesn't exist");
        }

        // @ts-ignore
        const hashPassword = loginData.hashPassword;

        const isCorrectPassword = bcrypt.compareSync(password, hashPassword);

        if (!isCorrectPassword) {
          res.status(401).send("wrong password");
          // res.end();
        } else {
          const token = nanoid();

          const tokenData = {
            username: req.body.username,
            token: token,
            loggedIn: true,
          };

          dbContext.Session.create(tokenData).catch((err) => {
            if (err) throw console.error(err);
          });
          res.cookie("session-token", token, COOKIE_OPTIONS);

          res.status(200).send("ok");
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const hash = bcrypt.hashSync(password, 10);

      let data = {
        subs: `${Math.random()}`,
        hashPassword: hash,
        username: req.body.username,
        progress: 0,
        loggedIn: true,
      };
      //TODO:  use the User model instead of Profile
      dbContext.User.create(data).catch((err) => {
        if (err) throw console.error(err);
      });

      // Creating session
      const token = nanoid();

      let tokenData = {
        username: req.body.username,
        token: token,
      };

      dbContext.Session.create(tokenData).catch((err) => {
        if (err) throw console.error(err);
      });

      // Creating a cookie
      res.cookie("session-token", token, COOKIE_OPTIONS);

      res.status(200).send("ok");
    } catch (error) {}
  }

  async amILoggedIn(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];

      if (isThereToken) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    } catch (error) {
      console.log("somethings bad happening", error);
    }
  }

  async validateUser(req, res) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        return "";
      }
      // grab their username - the server must do this
      await dbContext.Session.findOne({ token: isThereToken }, function (
        err,
        session
      ) {
        let username = "";
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return username;
        }

        // Their particular username to store with the data
        // @ts-ignore
        username = session.username;
        console.log("In validate User - username is", username);
        // res.body = username;
        return username;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProgress(req, res, next) {
    // res.status(200)
    let username = await validationService.validateUser(req);
    if (username === "") return res.status(401);

    await dbContext.User.find({ username: username }, function (
      err,
      documents
    ) {
      if (err) throw console.error(err);

      if (req.body.progress > documents[0].progress) {
        dbContext.User.findByIdAndUpdate(documents[0]._id, req.body, {
          new: true,
        });
      }
      return res.send(documents);
    });
    next();
  }
}
