import { DetailsModelInterface } from "../models/mariadb/deatils"
import { UserModelInterface } from "../models/mariadb/user"
import { RoleModelInterface } from "../models/mariadb/roles"
import { Request, Response, NextFunction } from "express"
import { CustomError } from "../utils/customError"
import { CreateDeatilsType } from "../models/mariadb/deatils"

export class DetailsController {
  private detailsModel: DetailsModelInterface
  private userModel: UserModelInterface
  private roleModel: RoleModelInterface

  constructor({
    detailsModel,
    userModel,
    roleModel
  }: {
    detailsModel: DetailsModelInterface
    userModel: UserModelInterface
    roleModel: RoleModelInterface
  }) {
    this.detailsModel = detailsModel
    this.userModel = userModel
    this.roleModel = roleModel
  }

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(request.params.id)
      if (isNaN(id)) {
        throw CustomError.Unauthorized("Invalid Details Id")
      }

      const deatils = await this.detailsModel.getById(id)

      if (!deatils) {
        throw CustomError.NotFound("Details not found")
      }

      response.status(200).json(deatils)
    } catch (error) {
      next(error)
    }
  }

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const details = await this.detailsModel.getAll()
      response.status(200).json(details)
    } catch (error) {
      next(error)
    }
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        name,
        description = null,
        notes = null,
        email,
        user_account_id,
        role_id
      } = request.body

      if (!name || !email || !user_account_id || !role_id) {
        throw CustomError.BadRequest("All data is required")
      }

      const user_account = await this.userModel.getById(user_account_id)

      if (!user_account) {
        throw CustomError.NotFound("User Account not found")
      }

      if (!(await this.roleModel.getById(role_id))) {
        throw CustomError.NotFound("Role not found")
      }

      const data: CreateDeatilsType = {
        name,
        description,
        notes,
        email,
        user_account_id,
        profile_filename: `https://ui-avatars.com/api/?name=${user_account.username}`,
        role_id
      }

      const details = await this.detailsModel.create(data)
      response.status(204).json(details)
    } catch (error) {
      next(error)
    }
  }
}
