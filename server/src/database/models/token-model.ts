import { pool } from "../client"

export class Token {
  id?= ''
  owner = ''
  token = ''
  constructor(id: string, owner: string, token: string) {
    this.id = id
    this.owner = owner
    this.token = token
  }

  static async create(owner: string, token: string) {
    try {
      const result = await pool.query(`INSERT INTO tokens (owner, token) VALUES('${owner}', '${token}') RETURNING id;`)
      return result.rows[ 0 ]
    } catch (e) {
      console.log('error inserting token ' + e)
    }
  }

  static async delete(owner: string) {
    try {
      const result = await pool.query(`DELETE FROM tokens WHERE owner='${owner}' RETURNING id;`)
      return result.rows[ 0 ]
    } catch (e) {
      console.log('error deleting token ' + e)
    }
  }

  static async get(owner: string) {
    try {
      const result = await pool.query(`SELECT * FROM tokens WHERE owner='${owner}';`)
      return result.rows[ 0 ] as Token
    } catch (e) {
      console.log('error getting token ' + e)
    }
  }
}