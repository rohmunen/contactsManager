import { User } from "../database/models/user-model"
import { UserDto } from '../dtos/user-dto'
import tokenService from "./token-service"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/api-errors"

class UserService {
  async signin(email: string, nickname: string, password: string) {
    const user = await User.create({ email, nickname, password })
    const userDto = new UserDto(user)
    const token = tokenService.generateToken({ ...userDto })

    return { token, expire: '1800' }
  }

  async login(email: string, password: string) {
    const user = await User.getByEmail(email)
    const hashEqual = await bcrypt.compare(password, user.password)
    if (!hashEqual) {
      throw ApiError.UnauthorizedError()
    }
    const userDto = new UserDto(user)
    const token = tokenService.generateToken({ ...userDto })
    return { token, expire: '1800' }
  }

  // refresh(authorizationHeader: string) {
  //   const userData = tokenService.validateAccessToken(authorizationHeader)
  //   if (!userData) {
  //     throw ApiError.UnauthorizedError()
  //   }
  //   const token = tokenService.generateToken({ ...userData })
  //   return { token, expire: '1800' }
  // }
}

export default new UserService()