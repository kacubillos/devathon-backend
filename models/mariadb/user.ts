import { PrismaClient, User_accounts} from '@prisma/client'
import { omitFields } from '../../utils/middleware'

export interface UserDocument extends User_accounts {} 
export type CreateUserType = Pick<User_accounts, "username" | "password">

const prisma = new PrismaClient()



export default class UserModel {
    
    static getAll = async () => {
        const users = await prisma.user_accounts.findMany()
        const usersWithoutPassword =  users.map(user => omitFields(user, ['password']))
        return usersWithoutPassword
    }

    static getById = async (id: number)  => {
        const user = await prisma.user_accounts.findUnique({
            where: {
                id
            }
        })
              
        return user
    }

    static create = async (user: CreateUserType) => {
        const createdUser = await prisma.user_accounts.create({
            data: user
        })
        return createdUser
    }

    static delete = async (id: number) => {
        const deletedUser = await prisma.user_accounts.delete({
            where: {
                id
            }
        })
        return deletedUser
    }
}

