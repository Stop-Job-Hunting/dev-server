import { dbContext } from "../db/DbContext"

class ValidationService {

  async validateUser(req) {
    try {
      const isThereToken = req.cookies["session-token"];

      if (!isThereToken) {
        return ("");
      }
      // grab their username - the server must do this
      let session = await dbContext.Session.findOne({ token: isThereToken })

      if (!session) {
        //TODO: we should have some other thing here
        console.error("Something is wrong - no user session")
        return ("");
      }

      // @ts-ignore
      return (session.username);

    } catch (error) {
      console.log(error)
    }
  }
}


export const validationService = new ValidationService();