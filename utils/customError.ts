export class CustomError extends Error {
  constructor(message: string, name: string) {
    super(message)
    this.name = name
  }
}

export function createCustomError(message: string, name: string): CustomError {
  return new CustomError(message, name)
}
