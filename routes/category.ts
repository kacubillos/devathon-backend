import { Router } from "express"
import { CategoryModelInteface } from "../models/mariadb/category"
import { CategoryController } from "../controllers/category"

interface createCategoryRoutesProps {
  categoryModel: CategoryModelInteface
}

export const createCategoryRoutes = ({
  categoryModel
}: createCategoryRoutesProps) => {
  const categoryRouter = Router()
  const categoryController = new CategoryController({ categoryModel })

  categoryRouter.get("/", categoryController.getAll)
  categoryRouter.get("/:id", categoryController.getById)
  categoryRouter.post("/", categoryController.create)
  categoryRouter.delete("/:id", categoryController.delete)
  categoryRouter.put("/:id", categoryController.update)

  return categoryRouter
}
