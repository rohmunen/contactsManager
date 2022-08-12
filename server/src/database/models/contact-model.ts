import { pool } from "../client"


export class Contact {
  id?= ''
  creator = ''
  name = ''
  phone = ''
  constructor(creator: string, name: string, phone: string) {
    this.creator = creator
    this.name = name
    this.phone = phone
  }

  // static async beforeCreate(tag) {
  //   Validator.ValidateTagName(tag.name)
  // }

  static async create(contact: Contact) {
    //await this.beforeCreate(tag)
    try {
      const newContact = await pool.query(`
      INSERT INTO contacts 
      (creator, name, phone) 
      VALUES ('${contact.creator}', '${contact.name}', '${contact.phone}') RETURNING creator, name, phone;`)
      return newContact.rows[ 0 ]
    } catch (error) {
      console.log('error creating contact', error)
    }
  }

  static async get(id: string) {
    try {
      const data = await pool.query(`SELECT * FROM contacts WHERE creator = '${id}';`)
      return data.rows
    } catch (error) {
      console.log('error getting contacts', error)
    }
  }
}