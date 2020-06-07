import BaseController from "../utils/BaseController"
import { dbContext } from "../db/DbContext"
import express from "express"
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

// async function validateUser(req, res, next) {
//   try {
//     const isThereToken = req.cookies["session-token"];
//     if (!isThereToken) {
//       res.status(401);
//       throw console.error("User not logged in");
//     }
//     // grab their username - the server must do this
//     await dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
//       if (err) throw console.error(err);

//       // @ts-ignore
//       if (!session || !session.loggedIn) {
//         return res.status(401).send("unauthorized");
//       }

//       // Their particular username to store with the data
//       // @ts-ignore
//       const username = session.username;
//       res.body = username;
//       res.status(200);
//       return username;
//     });
//   } catch (error) {
//     next(error)
//   }
// }
export default class SessionsController {
  constructor() {
    this.router = express
      .Router()
      .get("/logout", this.logout)
      .get("/am-i-logged-in", this.amILoggedIn)
      .post("/login", this.login)
      .post("/register", this.register)
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
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      // grab username from database
      dbContext.Profile.findOne({ username: username }, function (err, loginData) {
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
      next(error)
    }
  }

  async register(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const hash = bcrypt.hashSync(password, 10);
      // TODO: save this to database instead of fake database
      // users[username] = hash;
      console.log("password when register is:", hash);
      let data = {
        subs: `${Math.random()}`,
        hashPassword: hash,
        username: req.body.username,
        loggedIn: true,
      };

      dbContext.Profile.create(data).catch((err) => {
        if (err) throw console.error(err);
      });

      // Creating session
      const token = nanoid();
      // TODO: save session token to database instead of fake database

      let tokenData = {
        username: req.body.username,
        token: token,
      };

      dbContext.Session.create(tokenData).catch((err) => {
        if (err) throw console.error(err);
      });

      // sessions[token] = {
      //   username,
      // };

      // Creating a cookie
      res.cookie("session-token", token, COOKIE_OPTIONS);

      res.status(200).send("ok");
    } catch (error) {

    }
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

    }
  }

  async validateUser(req, res, next) {
    try {
      const isThereToken = req.cookies["session-token"];
      if (!isThereToken) {
        res.status(401);
        throw console.error("User not logged in");
      }
      // grab their username - the server must do this
      await dbContext.Session.findOne({ token: isThereToken }, function (err, session) {
        if (err) throw console.error(err);

        // @ts-ignore
        if (!session || !session.loggedIn) {
          return res.status(401).send("unauthorized");
        }

        // Their particular username to store with the data
        // @ts-ignore
        const username = session.username;
        console.log("In validate User - username is", username)
        // res.body = username;
        res.status(200);
        return username;
      });
    } catch (error) {
      next(error)
    }
  }
}