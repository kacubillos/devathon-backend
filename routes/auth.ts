import Router from "express"
import { AuthController } from "../controllers/auth"
import { UserModelInterface } from "../models/mariadb/user"

interface CreateAuthRouterProps {
  userModel: UserModelInterface
}

export const createAuthRouter = ({ userModel }: CreateAuthRouterProps) => {
  const authRouter = Router()
  const authController = new AuthController({ userModel })

  //TODO: create schema to login
  authRouter.post("/login", authController.login)
  return authRouter
}
