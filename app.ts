import express, { Express, Request, Response, NextFunction } from "express"

// Configs
import bodyParser from "body-parser"
import cors from "cors"
import middleware from "./utils/middleware"

// Router
import { createUserRouter } from "./routes/user"

// Swagger
import swagger from "./swagger.js"

// Models
import UserModel from "./models/mariadb/user"

const app: Express = express()
swagger(app)

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable("x-powered-by")

// Routes
app.use("/api/v1/users", createUserRouter({ userModel: UserModel }))

// Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
