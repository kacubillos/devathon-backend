import Router from 'express'
import { UserController } from '../controllers/user.js'
import { UserDocument } from '../models/mariadb/user';

export const createUserRouter = ({ userModel }) => {

    const userRouter = Router()
    const userController = new UserController({ userModel })

    /**
     * @swagger
     * /api/v1/users:
     *   get:
     *     summary: Get user
     *     description: Retrieves the authenticated user.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *              properties:
     *                 
     *                  username:
     *                      type: string
     *                  
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    userRouter.get('/', userController.getAll)

    return userRouter
}


