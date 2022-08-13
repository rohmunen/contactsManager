import userService from '../services/user-service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const { email, nickname, password } = req.body
      const userData = await userService.signin(email, nickname, password)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  } 

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const newToken = await userService.refresh(authorizationHeader)
      return res.json({token: newToken})
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()