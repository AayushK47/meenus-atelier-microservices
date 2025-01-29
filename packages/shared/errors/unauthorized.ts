import { BaseError } from "./base"

export class UnauthorizedError extends BaseError {
  statusCode: number = 401

  constructor(message: string) {
    super(message)
  }

  serialize(): Record<string, any> {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message
    }
  }
}