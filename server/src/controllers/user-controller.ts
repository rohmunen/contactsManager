import userService from '../services/user-service';
import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token-service';

class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, nickname, password } = req.body
      const userData = await userService.signup(email, nickname, password)
      await tokenService.writeTokenToDb(userData.user.id, userData.tokens.refreshToken)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      await tokenService.writeTokenToDb(userData.user.id, userData.tokens.refreshToken)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('refresh-token')
      const userData = tokenService.validateAccessToken(authorizationHeader)
      await tokenService.checkToken(userData.id)
      const newTokens = tokenService.generateToken(userData)
      return res.json({ newTokens })
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()