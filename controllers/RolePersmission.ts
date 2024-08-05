import { Request, Response, NextFunction } from "express"
import {
  CreateRolePermissionType,
  RolePermissionModelInterface
} from "../models/mariadb/RolePersmission"
import boom from "@hapi/boom"

export class RolePersmissionController {
  private rolePermissionModel: RolePermissionModelInterface
  constructor({
    rolePermissionModel
  }: {
    rolePermissionModel: RolePermissionModelInterface
  }) {
    this.rolePermissionModel = rolePermissionModel
  }

  create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { role_Id, permission_Id }: CreateRolePermissionType = request.body

      if (!role_Id || !permission_Id) {
        throw boom.badRequest("All fields are required")
      }

      const newRolePermission: CreateRolePermissionType = {
        role_Id,
        permission_Id
      }

      const result = await this.rolePermissionModel.create(newRolePermission)
      response.status(201).json({
        message: "Relation RolePermission created successfully",
        permission: result
      })
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
      const { role_Id, permission_Id, new_role_Id, new_permission_Id } =
        request.body

      // check if role permission exists
      const existingRolePermission =
        await this.rolePermissionModel.getRolePermission({
          roleId: role_Id,
          permissionId: permission_Id
        })

      if (!existingRolePermission) {
        throw boom.notFound("Role permission not found")
        return
      }

      const updatedRolePermission = await this.rolePermissionModel.update(
        { role_Id: role_Id, permission_Id: permission_Id },
        { role_Id: new_role_Id, permission_Id: new_permission_Id }
      )

      response.status(204).json({ rolePermission: updatedRolePermission })
    } catch (error) {
      next(error)
    }
  }

  getPermissionsForRole = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const role_Id = parseInt(request.params.role_Id, 10)

      const rolePermission =
        await this.rolePermissionModel.getPermissionsForRole(role_Id)

      response.status(200).json({
        message: "Role permission found successfully",
        rolePermission
      })
    } catch (error) {
      next(error)
    }
  }
} //end class
