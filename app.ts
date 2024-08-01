import express, { Express, Request, Response, NextFunction } from "express"

// Configs
import bodyParser from "body-parser"
import cors from "cors"
import middleware from "./utils/middleware"

// Router
import { createUserRouter } from "./routes/user"
import { createAuthRouter } from "./routes/auth"
import { createSupplierRouter } from "./routes/supplier"
import { createCategoryRoutes } from "./routes/category"

// Swagger
import swagger from "./swagger"

// Models
import UserModel from "./models/mariadb/user"
import SupplierModel from "./models/mariadb/supplier"
import CategoryModel from "./models/mariadb/category"

const app: Express = express()
swagger(app)

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable("x-powered-by")
app.set("view engine", "ejs")

// Routes
app.use("/api/v1/auth", createAuthRouter({ userModel: UserModel }))
app.use(
  "/api/v1/users",
  middleware.userExtractor,
  createUserRouter({ userModel: UserModel })
)
app.use(
  "/api/v1/suppliers",
  middleware.userExtractor,
  createSupplierRouter({ supplierModel: SupplierModel })
)

app.use(
  "/api/v1/categories",
  middleware.userExtractor,
  createCategoryRoutes({ categoryModel: CategoryModel })
)

// Middlewares
app.use(middleware.boomErrorHandler)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
