import { NextFunction, Request, Response } from "express"
import {
  CreateUserType,
  UpdateUserType,
  UserModelInterface
} from "../models/mariadb/user"
import { hashPassword } from "../utils/password-utils"
import { createCustomError, CustomError } from "../utils/customError"

export class UserController {
  private userModel: UserModelInterface

  constructor({ userModel }: { userModel: UserModelInterface }) {
    this.userModel = userModel
  }

  getAll = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userModel.getAll()
      response.json(users)
    } catch (error) {
      next(error)
    }
  }

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(request.params.id, 10)

      if (isNaN(userId)) {
        throw CustomError.Unauthorized("Invalid user ID")
        return
      }

      const user = await this.userModel.getById(userId)
      if (!user) {
        throw CustomError.NotFound("User not found")
        return
      }

      response.json(user)
    } catch (error) {
      next(error)
    }
  }

  create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = request.body

      if (!username || !password) {
        throw CustomError.BadRequest("Missing required fields")
        return
      }

      const hashedPassword = await hashPassword(password)

      const newUser: CreateUserType = { username, password: hashedPassword }
      const createdUser = await this.userModel.create(newUser)

      response
        .status(201)
        .json({ message: "User created successfully", user: createdUser })
    } catch (error) {
      next(error)
    }
  }

  delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(request.params.id, 10)

      if (isNaN(userId)) {
        throw CustomError.Unauthorized("Invalid user ID")
        return
      }

      const deletedUser = await this.userModel.getById(userId)
      if (!deletedUser) {
        throw CustomError.NotFound("User not found")
        return
      }

      await this.userModel.delete(userId)
      response.status(204).json({ message: "User deleted successfully" })
    } catch (error) {
      next(error)
    }
  }

  update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(request.params.id, 10)
      const { username, password } = request.body

      if (isNaN(userId)) {
        throw CustomError.Unauthorized("Invalid user ID")
        return
      }

      const user = await this.userModel.getById(userId)
      if (!user) {
        throw CustomError.NotFound("User not found")
        return
      }
      const data = {
        id: userId,
        username,
        password
      }

      const updatedUser: UpdateUserType = data

      const updated = await this.userModel.update(updatedUser)

      response.json(updated)
    } catch (error) {
      next(error)
    }
  }
}
