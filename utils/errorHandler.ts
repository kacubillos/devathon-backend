import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import boom from '@hapi/boom';
import { HTTP_STATUS } from './middleware';
export const boomErrorHandler = (error: unknown, request: Request, response: Response, next: NextFunction): void => {
  if (boom.isBoom(error)) {
    const { output } = error as boom.Boom;
    response.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
};

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error("Middleware: ErrorHandler : ", error.message, error.name)

  switch (error.name) {
    case "CastError":
      return response
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ error: "malformatted id" })
    case "ValidationError":
      return response
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: error.message })
    case "JsonWebTokenError":
      return response
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: error.message })
    case "TokenExpiredError":
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: "token expired"
      })
    case "BadRequest":
      return response.status(HTTP_STATUS.BAD_REQUEST).json({
        error: error.message
      })
    case "Unauthorized":
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: error.message
      })
    case "NotFound":
      return response.status(HTTP_STATUS.NOT_FOUND).json({
        error: error.message
      })
    default:
      return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error"
      })
  }
  next(error)
}