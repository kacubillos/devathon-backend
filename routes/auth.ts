import Router from "express"
import { AuthController } from "../controllers/auth"
import { UserModelInterface } from "../models/mariadb/user"

interface CreateAuthRouterProps {
  userModel: UserModelInterface
}

export const createAuthRouter = ({ userModel }: CreateAuthRouterProps) => {
  const authRouter = Router()
  const authController = new AuthController({ userModel })


  /**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     summary: Login
   *     description: User login.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *        content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '204':
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *              properties:
   *                  token:
   *                      type: string
   *       '400':
   *         description: All fields are necessary
   *       '401':
   *         description: Incorrect password
   *       '404':
   *         description: User not found
   *       '500':
   *         description: Internal server error
   */
  authRouter.post("/login", authController.login)
  return authRouter
}
