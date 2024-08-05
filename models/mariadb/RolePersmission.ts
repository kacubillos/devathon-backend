import { PrismaClient, RolePermission } from "@prisma/client"

export interface RolePersmissionDocument extends RolePermission {}

export type CreateRolePermissionType = Pick<
  RolePermission,
  "role_Id" | "permission_Id"
>
export type UpdateRolePermissionType = Partial<RolePersmissionDocument>

//importan to use many to many relationship
export interface CompoundKey {
  role_Id_permission_Id: {
    role_Id: number
    permission_Id: number
  }
}

export interface RolePermissionModelInterface {
  getCompoundKey(id: { role_Id: number; permission_Id: number }): CompoundKey
  create(data: {
    role_Id: number
    permission_Id: number
  }): Promise<RolePersmissionDocument>
  update(
    id: { role_Id: number; permission_Id: number },
    data: UpdateRolePermissionType
  ): Promise<RolePersmissionDocument>
  getPermissionsForRole(role_Id: number): Promise<RolePermission[]>
  getRolesForPermission(permission_Id: number): Promise<RolePermission[]>
  getAllPermissions(): Promise<RolePermission[]>
  getAllRoles(): Promise<RolePermission[]>
  getRolePermission(id: {
    roleId: number
    permissionId: number
  }): Promise<RolePermission | null>
}

const prisma = new PrismaClient()

export default class RolePermissionModel {
  //importan to use many to many relationship
  static getCompoundKey(id: {
    role_Id: number
    permission_Id: number
  }): CompoundKey {
    return {
      role_Id_permission_Id: {
        role_Id: id.role_Id,
        permission_Id: id.permission_Id
      }
    }
  }
  static create = async (data: {
    role_Id: number
    permission_Id: number
  }): Promise<RolePersmissionDocument> => {
    const result = await prisma.rolePermission.create({
      data: {
        ...data
      }
    })
    return result
  }

  static update = async (
    id: { role_Id: number; permission_Id: number },
    data: UpdateRolePermissionType
  ): Promise<RolePersmissionDocument> => {
    const compoundKey = RolePermissionModel.getCompoundKey(id)
    const result = await prisma.rolePermission.update({
      where: compoundKey,
      data
    })
    return result
  }

  /**
   * Get all permissions for a role
   * @param role_Id
   * @returns
   */
  static getPermissionsForRole = async (role_Id: number) => {
    const result = await prisma.rolePermission.findMany({
      where: {
        role_Id
      },
      include: {
        permission: true
      }
    })
    return result
  }

  /**
   * Get all roles for a permission
   * @param permission_Id
   * @returns
   */
  static getRolesForPermission = async (permission_Id: number) => {
    const result = await prisma.rolePermission.findMany({
      where: {
        permission_Id
      },
      include: {
        role: true
      }
    })
    return result
  }

  /**
   * Get all permissions
   * @returns
   */
  static getAllPermissions = async () => {
    const result = await prisma.rolePermission.findMany({
      include: {
        permission: true
      }
    })
    return result
  }

  /**
   * Get all roles
   * @returns
   */
  static getAllRoles = async () => {
    const result = await prisma.rolePermission.findMany({
      include: {
        role: true
      }
    })
    return result
  }

  static async getRolePermission(id: {
    roleId: number
    permissionId: number
  }): Promise<RolePermission | null> {
    const { roleId, permissionId } = id
    const rolePermission = await prisma.rolePermission.findUnique({
      where: {
        role_Id_permission_Id: {
          role_Id: roleId,
          permission_Id: permissionId
        }
      }
    })

    return rolePermission
  }
}
