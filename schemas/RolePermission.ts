import Joi from "joi"

//role permission schema
const roleIdSchema = Joi.number().integer().positive().required()
const permissionIdSchema = Joi.number().integer().positive().required()

//role permission create schema
const rolePermissionSchema = Joi.object({
  role_Id: roleIdSchema,
  permission_Id: permissionIdSchema
})

//operation-specific role permission schemas
const createRolePermissionSchema = rolePermissionSchema.keys({
  role_Id: roleIdSchema,
  permission_Id: permissionIdSchema
})

const updateRolePermissionSchema = createRolePermissionSchema
  .keys({
    new_role_Id: roleIdSchema,
    new_permission_Id: permissionIdSchema
  })
  .required()
  .options({
    abortEarly: false
  })

const getPermissionsForRoleSchema = Joi.object({
  role_Id: roleIdSchema.required()
})

export const rolePermissionSchemas = {
  create: createRolePermissionSchema,
  update: updateRolePermissionSchema,
  getPermissonsForRole: getPermissionsForRoleSchema
}

export default rolePermissionSchemas
