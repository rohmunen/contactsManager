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

  // async refresh(req, res, next) {
  //   try {
  //     const authorizationHeader = req.header('Authorization').split(' ')[1]
  //     const userData = userService.refresh(authorizationHeader)
  //     return res.json(userData)
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // async getSelf(req, res, next) {
  //   try {
  //     const authorizationHeader = req.header('Authorization').split(' ')[1]
  //     const userData = userService.getUser(authorizationHeader)
  //     return res.json(userData)
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // async update(req, res, next) {
  //   try {
  //     const authorizationHeader = req.header('Authorization').split(' ')[1]
  //     const result = await userService.update(authorizationHeader, req.body)
  //     return res.json(result)
  //   } catch (e) {
  //     next(e)
  //   }
  // }
}

export default new UserController()