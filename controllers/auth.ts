import { Request, Response, NextFunction } from "express"
import { UserModelInterface } from "../models/mariadb/user"
import { generateAccessToken } from "../utils/middleware"
import { CustomError } from "../utils/customError"
import { verifyPassword } from "../utils/password-utils"

export class AuthController {
  private userModel: UserModelInterface

  constructor({ userModel }: { userModel: UserModelInterface }) {
    this.userModel = userModel
  }

  login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = request.body
      if (!username || !password) {
        throw CustomError.BadRequest("All fields are necessary")
        return
      }

      const user = await this.userModel.getByUsername(username)

      if (!user) {
        throw CustomError.NotFound("User not fount")
        return
      }

      const isPasswordCorrect = await verifyPassword(password, user.password)
      if (!isPasswordCorrect) {
        throw CustomError.Unauthorized("Incorrect password")
        return
      }

      const token = generateAccessToken(user)
      response.json({ token })
    } catch (error) {
      next(error)
    }
  }
}
