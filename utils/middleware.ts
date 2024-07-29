import jwt from "jsonwebtoken"
import User, { UserDocument } from "../models/mariadb/user"
import logger from "./logger"
import { NextFunction, Request, Response } from "express"
import "./custom-request.d.ts"
import { createCustomError } from "./customError"
import { errorHandler, boomErrorHandler } from "./errorHandler"
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unkown endpoint" })
}


const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFrom(request)

    if (!token) {
      throw createCustomError("token missing or invalid", "JsonWebTokenError")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)

    if (typeof decodedToken === "string") {
      throw createCustomError("token invalid", "JsonWebTokenError")
    }
    if (!decodedToken.id) {
      throw createCustomError("token invalid", "JsonWebTokenError")
    }
    request.user = (await User.getById(decodedToken.id)) as UserDocument

    next()
  } catch (error) {
    next(error)
  }
}

export const omitFields = (user: UserDocument, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  )
}

export const generateAccessToken = (user: UserDocument) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
}

const middleware = {
  requestLogger,
  unknownEndpoint,
  boomErrorHandler,
  errorHandler,
  tokenExtractor,
  userExtractor
}

export default middleware
