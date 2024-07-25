import { Request, Response } from "express"
import {
  UserDocument,
  CreateUserType,
  UpdateUserType
} from "../models/mariadb/user"
interface UserModelInterface {
  getAll: () => Promise<UserDocument[]>
  getById: (id: number) => Promise<UserDocument>
  create: (user: CreateUserType) => Promise<UserDocument>
  update: (user: UpdateUserType) => Promise<UserDocument>
  delete: (id: number) => Promise<UserDocument>
}

export class UserController {
  private userModel: UserModelInterface

  constructor({ userModel }: { userModel: UserModelInterface }) {
    this.userModel = userModel
  }

  getAll = async (_request: Request, response: Response): Promise<void> => {
    const users = await this.userModel.getAll()
    response.json(users)
  }

  getById = async (request: Request, response: Response): Promise<void> => {
    try {
      const userId = parseInt(request.params.id, 10)

      if (isNaN(userId)) {
        response.status(400).json({ error: "Invalid user ID" })
        return
      }

      const user = await this.userModel.getById(userId)
      if (!user) {
        response.status(404).json({ error: "User not found" })
        return
      }

      response.json(user)
    } catch (error) {
      response.status(500).json({ error: "Internal server error" })
    }
  }

  create = async (request: Request, response: Response): Promise<void> => {
    try {
      const { username, password } = request.body

      if (!username || !password) {
        response.status(400).json({ error: "Missing required fields" })
        return
      }

      const newUser: CreateUserType = { username, password }
      const createdUser = await this.userModel.create(newUser)
      response.status(201).json(createdUser)
    } catch (error) {
      response.status(500).json({ error: "Internal server error" })
    }
  }
  update = async (request: Request, response: Response): Promise<void> => {
    try {
      const userId = parseInt(request.params.id, 10)
      const { username, password } = request.body

      if (isNaN(userId)) {
        response.status(400).json({ error: "Invalid user ID" })
        return
      }

      const user = await this.userModel.getById(userId)
      if (!user) {
        response.status(404).json({ error: "User not found" })
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
      response.status(500).json({ error: "Internal server error" })
    }
  }
  delete = async (request: Request, response: Response): Promise<void> => {
    try {
      const userId = parseInt(request.params.id, 10)

      if (isNaN(userId)) {
        response.status(400).json({ error: 'Invalid user ID' })
        return
      }

      const deletedUser = await this.userModel.getById(userId)
      if (!deletedUser) {
        response.status(404).json({ error: 'User not found' })
        return
      }

      await this.userModel.delete(userId)
      response.json({ message: 'User deleted successfully' })

    } catch (error) {
      response.status(500).json({ error: 'Internal server error' })
    }
  }
}


