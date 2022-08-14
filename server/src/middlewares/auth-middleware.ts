import { ApiError } from '../utils/api-errors'
import tokenService from "../services/token-service";
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header('access-token')
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(authorizationHeader)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}