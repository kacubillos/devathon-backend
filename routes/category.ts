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

  return categoryRouter
}
