import { Request, Response, NextFunction } from "express"
import {
  RoleModelInterface,
  CreateRoleType,
  UpdateRoleType
} from "../models/mariadb/roles"
import boom from "@hapi/boom"

export class RoleController {
  private roleModel: RoleModelInterface

  constructor({ roleModel }: { roleModel: RoleModelInterface }) {
    this.roleModel = roleModel
  }

  getAll = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roles = await this.roleModel.getAll()
      response.status(200).json(roles)
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
      const roleId = parseInt(request.params.id, 10)
      if (isNaN(roleId)) {
        throw boom.unauthorized("Invalid role ID")
        return
      }
      const role = await this.roleModel.getById(roleId)
      if (!role) {
        throw boom.notFound("Role not found")
        return
      }
      response.json(role)
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
      const { name, description } = request.body

      if (!name || !description) {
        throw boom.badRequest("Missing required fields")
        return
      }

      const newRole: CreateRoleType = { name, description }
      const createdRole = await this.roleModel.create(newRole)

      response
        .status(201)
        .json({ message: "Role created successfully", role: createdRole })
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
      const roleId = parseInt(request.params.id, 10)
      if (isNaN(roleId)) {
        throw boom.unauthorized("Invalid role ID")
        return
      }
      const deletedRole = await this.roleModel.getById(roleId)
      if (!deletedRole) {
        throw boom.notFound("Role not found")
        return
      }
      await this.roleModel.delete(roleId)
      response.status(204).json({ message: "Role deleted successfully" })
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
      const roleId = parseInt(request.params.id, 10)
      const { name, description } = request.body

      if (isNaN(roleId)) {
        throw boom.unauthorized("Invalid role ID")
        return
      }

      const role = await this.roleModel.getById(roleId)
      if (!role) {
        throw boom.notFound("Role not found")
        return
      }

      const data = {
        id: roleId,
        name,
        description
      }

      const updatedRole: UpdateRoleType = data

      const updated = await this.roleModel.update(updatedRole)

      response.json(updated)
    } catch (error) {
      next(error)
    }
  }
} //end class
