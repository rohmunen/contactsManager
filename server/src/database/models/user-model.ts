import { pool } from "../client"
import bcryptjs from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from "../../utils/api-errors";


export class User {
  id?= ''
  email = ''
  nickname = ''
  password = ''
  constructor(id: string, email: string, nickname: string, password: string) {
    this.id = id
    this.email = email
    this.nickname = nickname
    this.password = password
  }

  static async beforeCreate(user: User) {
    const id = uuidv4();
    const hashPassword = await bcryptjs.hash(user.password, 3)
    const dbUser = await this.getByEmail(user.email)
    if (dbUser) {
      throw ApiError.BadRequest('Email taken')
    }
    user.password = hashPassword
    user.id = id
    return user
  }

  static async create(user: User) {
    user = await this.beforeCreate(user)
    try {
      await pool.query(`INSERT INTO users 
      (id, email, nickname, password) 
      VALUES ('${user.id}', '${user.email}', '${user.nickname}', '${user.password}')`)
    } catch (error) {
      console.log('error creating user', error)
    }
    return user
  }

  static async delete(user: User) {
    try {
      await pool.query(`DELETE FROM users WHERE id = ${user.id};`)
    } catch (error) {
      console.log('error deleting user', error)
    }
  }

  static async update(id: string, user: User) {
    if (user.password) {
      user = await this.beforeCreate(user)
    }
    try {
      if (user.email) {
        await pool.query(`UPDATE users SET email = '${user.email}' WHERE id = '${id}';`)
      }
      if (user.nickname) {
        await pool.query(`UPDATE users SET nickname = '${user.nickname}' WHERE id = '${id}';`)
      }
      if (user.password) {
        await pool.query(`UPDATE users SET password = '${user.password}' WHERE id = '${id}';`)
      }
      return { email: user.email, nickname: user.nickname }
    } catch (error) {
      console.log('error updating user', error)
    }
  }

  static async getByEmail(email: string) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE email = '${email}';`)
      return userData.rows[ 0 ]
    } catch (error) {
      console.log('error getting user by email ', error)
    }
  }

  static async getByName(name: string) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE nickname = '${name}';`)
      return userData.rows[ 0 ]
    } catch (error) {
      console.log('error getting user by id ', error)
    }
  }

  static async getById(id: string) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE id = '${id}';`)
      return userData.rows[ 0 ]
    } catch (error) {
      console.log('error getting user by id ', error)
    }
  }
}