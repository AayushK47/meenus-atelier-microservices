import { BaseError } from "./base";

export class ConflictError extends BaseError {
  statusCode: number = 409;
  serialize(): Record<string, any> {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message
    }
  }
  constructor(message: string) {
    super(message);
  }
}