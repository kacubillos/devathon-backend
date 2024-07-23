import { Request, Response } from 'express'
import { UserDocument } from '../models/mariadb/user'

export class UserController {
    
    private userModel: {
        getAll: () => Promise<UserDocument[]>;
      };

    constructor({ userModel }  ) {
        this.userModel = userModel;
      }

    getAll = async (_request:Request, response:Response): Promise<void> => {
        const users = await this.userModel.getAll()
        response.json(users)
    }    
}