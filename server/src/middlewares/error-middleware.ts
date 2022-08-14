import { ApiError } from '../utils/api-errors'
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: 'Пользователь не авторизован' })
  }
  return res.status(500).json({ message: 'Ошибка на сервере' })
}