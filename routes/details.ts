import { Router } from "express"
import { DetailsModelInterface } from "../models/mariadb/deatils"
import { UserModelInterface } from "../models/mariadb/user"
import { DetailsController } from "../controllers/details"
import { RoleModelInterface } from "../models/mariadb/roles"

interface createDetailsRouterProps {
  detailsModel: DetailsModelInterface
  userModel: UserModelInterface
  roleModel: RoleModelInterface
}

export const createDetailsRouter = ({
  detailsModel,
  userModel,
  roleModel
}: createDetailsRouterProps) => {
  const detailsController = new DetailsController({
    detailsModel,
    userModel,
    roleModel
  })
  const detailsRouter = Router()

  detailsRouter.get("/:id", detailsController.getById)
  detailsRouter.get("/", detailsController.getAll)

  return detailsRouter
}
