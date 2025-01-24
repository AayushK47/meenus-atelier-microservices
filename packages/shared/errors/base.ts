export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message)

    // Set the prototype explicitly to maintain proper instanceof checks
    Object.setPrototypeOf(this, new.target.prototype)
  }
  abstract statusCode: number
  abstract serialize(): Record<string, any>
}