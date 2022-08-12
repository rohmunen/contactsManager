import { User } from "../database/models/user-model"

export class UserDto {

  id: string
  nickname: string
  email: string

  constructor(model: User){
    this.id = model.id
    this.nickname = model.nickname
    this.email = model.email
  }
}