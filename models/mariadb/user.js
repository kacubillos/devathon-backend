import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default class User {
    
    static getAll = async () =>{
        const users = await prisma.user_accounts.findMany()
        const usersWithOutPassword =  users.map(user => omitFields(user, ['password']))
        console.log(usersWithOutPassword)
        return usersWithOutPassword
    }
}

const omitFields = (user, keys) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}