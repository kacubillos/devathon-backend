import { PrismaClient, Category } from "@prisma/client"

type CreateCategoryType = Pick<Category, "name" | "description">
type UpdateCategoryTYpe = Partial<Category>

const prisma = new PrismaClient()

export default class CategoryModel {
  static getById = async (id: number) => {
    const category = prisma.category.findUnique({
      where: {
        id
      }
    })
    return category
  }
  static getAll = async () => {
    const category = prisma.category.findMany()
    return category
  }
  static create = async (data: CreateCategoryType) => {
    const category = prisma.category.create({
      data
    })
    return category
  }
  static delete = async (id: number) => {
    const category = prisma.category.delete({
      where: {
        id
      }
    })
    return category
  }
  static update = async (data: UpdateCategoryTYpe) => {
    const category = prisma.category.update({
      data,
      where: {
        id: data.id
      }
    })
    return category
  }
}