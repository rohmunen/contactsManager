import jwt from 'jsonwebtoken'
import { Token } from '../database/models/token-model'
import { User } from '../database/models/user-model'
import { UserDto } from '../dtos/user-dto'
import { ApiError } from '../utils/api-errors'

class TokensService {
  generateToken(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '30m' })
    return accessToken
  }

  validateAccessToken(token: string): UserDto {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET)
      return userData as UserDto
    } catch (error) {
      return null
    }
  }
}

export default new TokensService()