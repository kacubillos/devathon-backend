import Router from "express"
import { UserController } from "../controllers/user"
import { UserModelInterface } from "../models/mariadb/user"
import { validatorHandler } from "../utils/validatorHandler"
import userSchema from "../schemas/user"

interface CreateUserRouterProps {
  userModel: UserModelInterface
}
export const createUserRouter = ({ userModel }: CreateUserRouterProps) => {
  const userRouter = Router()
  const userController = new UserController({ userModel })

  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     summary: Get user
   *     description: Retrieves all users.
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
   *       400:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  userRouter.get("/", userController.getAll)
  /**
   * @swagger
   * /api/v1/users/:id:
   *   get:
   *     summary: Get user by id
   *     description: Retrieves the user.
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
   *       400:
   *         description: Unauthorized
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  userRouter.get("/:id", validatorHandler(userSchema.get, "params"), userController.getById)
  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     tags:
   *       - user
   *     summary: Create user
   *     description: Creates a new user.
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '201':
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 username:
   *                   type: string
   *                 id:
   *                   type: string
   *       '400':
   *         description: Unauthorized
   *       '500':
   *         description: Internal server error
   *
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - username
   *         - password
   *       properties:
   *         id:
   *           type: integer
   *           description: Unique identifier for the user
   *         username:
   *           type: string
   *           minLength: 3
   *           maxLength: 30
   *           description: Username for the user, between 3 and 30 characters
   *         password:
   *           type: string
   */
  userRouter.post("/", validatorHandler(userSchema.create, "body"), userController.create)
  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     tags:
   *       - user
   *     summary: Update user
   *     description: Updates the user.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 username:
   *                   type: string
   *                 id:
   *                   type: string
   *       '400':
   *         description: Unauthorized
   *       '404':
   *         description: User not found
   *       '500':
   *         description: Internal server error
   */
  userRouter.put("/:id", validatorHandler(userSchema.get, "params"), validatorHandler(userSchema.update, "body"), userController.update)
  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     tags:
   *       - user
   *     summary: Delete user
   *     description: Delete the user.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '204':
   *         description: Successful response
   *       '400':
   *         description: Unauthorized
   *       '404':
   *         description: User not found
   *       '500':
   *         description: Internal server error
   */
  userRouter.delete("/:id", validatorHandler(userSchema.delete, "params"), userController.delete)

  return userRouter
}
