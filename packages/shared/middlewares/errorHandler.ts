import { Request, Response, NextFunction } from 'express'
import { BaseError } from '../errors/base'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Error Handler')
  // Default to 500 if no statusCode is provided
  const statusCode = err instanceof BaseError ? err.statusCode : 500
  const message = err.message || 'Internal Server Error'

  if(err instanceof BaseError) {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: err.serialize()
    }) 
  } else {
    res.status(statusCode).json({
      success: false,
      statusCode: 500,
      message
    })
  }
}