export class Token {
  id? = ''
  email = ''
  nickname = ''
  password = ''
  constructor(id: string, email: string, nickname: string, password: string) {
    this.id = id
    this.email = email
    this.nickname = nickname
    this.password = password
  }
}