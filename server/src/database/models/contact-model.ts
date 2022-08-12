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

  static async update(id: string, contact: Contact) {
    try {
      if (contact.name) {
        await pool.query(`UPDATE contacts SET name = '${contact.name}' WHERE id = ${id};`)
      }
      if (contact.phone) {
        await pool.query(`UPDATE contacts SET phone = '${contact.phone}' WHERE id = ${id};`)
      }
      return { id: id }
    } catch (error) {
      console.log('error updating contact', error)
    }
  }

  static async getById(id: string): Promise<Contact> {
    try {
      const data = await pool.query(`SELECT * FROM contacts WHERE id = '${id}';`)
      return data.rows[ 0 ] as Contact
    } catch (error) {
      console.log('error getting contacts', error)
    }
  }

  static async getByUserId(id: string) {
    try {
      const data = await pool.query(`SELECT * FROM contacts WHERE creator = '${id}';`)
      return data.rows
    } catch (error) {
      console.log('error getting contacts', error)
    }
  }
}