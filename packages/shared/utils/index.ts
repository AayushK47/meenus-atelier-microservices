import { Request } from 'express'

export function  getRequestProperties(req: Request) {
  return { body: req.body, query: req.query, params: req.params }
}