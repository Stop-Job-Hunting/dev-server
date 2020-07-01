import { dbContext } from "../db/DbContext";

class ValidationService {
  async validateUser(req) {
    console.log("start validation service");

    try {
      const isThereToken = req.cookies["session-token"];
      console.log("session cookie: ", isThereToken);

      if (!isThereToken) {
        return "";
      }
      // grab their username - the server must do this
      let session = await dbContext.Session.findOne({
        token: isThereToken,
      }).exec();

      console.log("this is the session doc: ", session);

      if (!session) {
        //TODO: we should have some other thing here
        console.error("Something is wrong - no user session");
        return "";
      }

      return session.username;
    } catch (error) {
      console.log(error);
    }
  }
}

export const validationService = new ValidationService();
