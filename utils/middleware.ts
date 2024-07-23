import jwt, { JwtPayload } from 'jsonwebtoken'
import User, { UserDocument } from '../models/mariadb/user.js'
import logger from './logger.js';
import { NextFunction, Request, Response } from 'express'
import './custom-request.d.ts';


const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({error: 'unkown endpoint'})
}

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    } else if ( error.name === 'JsonWebTokenError'){
        return response.status(400).json({ error: 'token missing or invalid'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

const getTokenFrom = (request: Request): string | null => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

const tokenExtractor = (request: Request, response: Response, next: NextFunction) => {
	request.token = getTokenFrom(request)
	next()
}

const userExtractor = async (request: Request, response: Response, next: NextFunction) => {
	const token = getTokenFrom(request)

	if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
        if (typeof decodedToken === 'string') {
            return response.status(401).json({ error: 'token invalid' });
        }
		if (!decodedToken.id) {
    	    return response.status(401).json({ error: 'token invalid' })
    	}
    	request.user = await User.findById(decodedToken.id) as UserDocument
  	}
	next()
}

export const omitFields = (user: UserDocument, keys: string[]) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}

const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};

export default middleware;