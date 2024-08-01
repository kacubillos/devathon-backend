import express, { type Express } from "express"

// Configs
import bodyParser from "body-parser"
import cors from "cors"
import middleware from "./utils/middleware"

// Router
import { createUserRouter } from "./routes/user"
import { createAuthRouter } from "./routes/auth"
import { createSupplierRouter } from "./routes/supplier"
import { createRoleRouter } from "./routes/role"

// Swagger
import swagger from "./swagger"

// Models
import UserModel from "./models/mariadb/user"
import SupplierModel from "./models/mariadb/supplier"
import RoleModel from "./models/mariadb/roles"

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
  "/api/v1/roles",
  middleware.userExtractor,
  createRoleRouter({ roleModel: RoleModel })
)

// Middlewares
app.use(middleware.boomErrorHandler)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
