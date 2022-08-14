import jwt from 'jsonwebtoken'
import { Token } from '../database/models/token-model'
import { UserDto } from '../dtos/user-dto'
import { ApiError } from '../utils/api-errors'

class TokensService {
  generateToken(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1m' })
    const refreshToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1800m' })
    return { accessToken, refreshToken }
  }

  validateAccessToken(token: string): UserDto {
    try {
      const data = jwt.verify(token, process.env.ACCESS_SECRET) as jwt.JwtPayload
      const { exp, iat, ...rest } = data
      return rest as UserDto
    } catch (error) {
      throw ApiError.UnauthorizedError()
    }
  }

  async writeTokenToDb(owner: string, token: string) {
    try {
      await Token.delete(owner)
      const result = await Token.create(owner, token)
      return result
    } catch (e) {
      console.log('error writing token to db ' + e)
    }
  }

  async checkToken(owner: string) {
    const result = await Token.get(owner)
    if (!result) {
      throw ApiError.BadRequest('Неправильный refresh token')
    }
    return result
  }
}

export default new TokensService()