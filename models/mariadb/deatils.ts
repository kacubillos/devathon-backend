import { PrismaClient, User_details } from "@prisma/client"

const prisma = new PrismaClient()

export type CreateDeatilsType = Omit<User_details, "id">
export type UpdateDeatilsType = Partial<User_details>

export interface DetailsModelInterface {
  getById: (id: number) => Promise<User_details>
  getAll: () => Promise<User_details[]>
  create: (data: CreateDeatilsType) => Promise<User_details>
  update: (data: UpdateDeatilsType) => Promise<User_details>
}

export default class DetailsModel {
  static getById = async (id: number) => {
    const details = await prisma.user_details.findUnique({
      where: {
        id
      }
    })
    return details
  }

  static getAll = async () => {
    const details = await prisma.user_details.findMany()
    return details
  }

  static create = async (data: CreateDeatilsType) => {
    const details = await prisma.user_details.create({
      data
    })
    return details
  }

  static update = async (data: UpdateDeatilsType) => {
    const details = await prisma.user_details.update({
      where: {
        id: data.id
      },
      data
    })
    return details
  }
}
