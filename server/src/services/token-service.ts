import jwt from 'jsonwebtoken'
import { UserDto } from '../dtos/user-dto'

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