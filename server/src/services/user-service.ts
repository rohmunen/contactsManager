import { User } from "../database/models/user-model"
import { UserDto } from '../dtos/user-dto'
import tokenService from "./token-service"
import bcryptjs from "bcryptjs"
import { ApiError } from "../utils/api-errors"

class UserService {
  async signup(email: string, nickname: string, password: string) {
    const user = await User.create({ email, nickname, password })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })

    return { user: userDto, tokens: tokens }
  }

  async login(email: string, password: string) {
    console.log(email, password)
    const user = await User.getByEmail(email)
    const hashEqual = await bcryptjs.compare(password, user.password)
    if (!hashEqual) {
      throw ApiError.BadRequest('wrong email || password')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    return { user: userDto, tokens: tokens }
  }

  async refresh(token: string) {
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(token)
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    const userFromDb = await User.getById(userData.id)
    const newToken = tokenService.generateToken(userFromDb)
    return newToken
  }
}

export default new UserService()