import { NextFunction, Request, Response } from "express"
import {
  CreateSupplierType,
  UpdateSupplierType,
  SupplierModelInterface
} from "../models/mariadb/supplier"
import { request } from "http"
import { CustomError } from "../utils/customError"
import { json } from "body-parser"

export class SupplierController {
  private supplierModel: SupplierModelInterface
  constructor({ supplierModel }: { supplierModel: SupplierModelInterface }) {
    this.supplierModel = supplierModel
  }

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(request.params.id, 10)

      if (isNaN(id)) {
        throw CustomError.Unauthorized("Invalid supplier ID")
      }

      const supplier = await this.supplierModel.getById(id)

      if (!supplier) {
        throw CustomError.NotFound("Supplier not found")
      }
      response.status(200).json(supplier)
    } catch (error) {
      next(error)
    }
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, location, contact }: CreateSupplierType = request.body

      if (!name || !location || !contact) {
        throw CustomError.BadRequest("All data is required")
      }

      const newSupplier: CreateSupplierType = {
        name: name,
        location: location,
        contact: contact
      }

      const supplier = await this.supplierModel.create(newSupplier)

      response
        .status(201)
        .json({ message: "Supplier created successfully", supplier: supplier })
    } catch (erorr) {
      next(erorr)
    }
  }

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id)

      if (isNaN(id)) {
        throw CustomError.Unauthorized("Invalid supplier ID")
      }

      const supplier = await this.supplierModel.getById(id)
      if (!supplier) {
        throw CustomError.NotFound("Supplier not found")
      }

      const { name, location, contact }: UpdateSupplierType = request.body
      const data: UpdateSupplierType = {
        id: id,
        name,
        location,
        contact
      }

      const updatedSupplier = await this.supplierModel.update(data)

      response.status(200).json({ supplier: updatedSupplier })
    } catch (error) {
      next(error)
    }
  }

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = parseInt(request.params.id)

      if (isNaN(id)) {
        throw CustomError.Unauthorized("Invalid supplier ID")
      }

      const supplier = await this.supplierModel.getById(id)
      if (!supplier) {
        throw CustomError.NotFound("Supplier not found")
      }

      await this.supplierModel.delete(id)
      response.status(200).json({ message: "Supplier deleted successfully" })
    } catch (error) {
      next(error)
    }
  }
}
