import { PrismaClient} from '@prisma/client'
import { omitFields } from '../../utils/middleware.js'

const prisma = new PrismaClient()

export default class User {
    
    static getAll = async () =>{
        const users = await prisma.user_accounts.findMany()
        const usersWithOutPassword =  users.map(user => omitFields(user, ['password','id']))
        console.log(usersWithOutPassword)
        return usersWithOutPassword
    }
}

