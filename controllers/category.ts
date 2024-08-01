import { CategoryModelInteface } from "../models/mariadb/category"

export class CategoryController {
  private categoryModel: CategoryModelInteface
  constructor({ categoryModel }: { categoryModel: CategoryModelInteface }) {
    this.categoryModel = categoryModel
  }
}
