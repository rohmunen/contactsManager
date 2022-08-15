import { ApiError } from "../../utils/api-errors"
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

  static async validateCreateContact(contact: Contact) {
    if (contact.name.length > 39) {
      throw ApiError.BadRequest('Слишком длинное имя!')
    }
    let dbContact = await this.getByPhone(contact.phone, contact.creator)
    if (dbContact.length > 0) {
      throw ApiError.BadRequest('Контакт с таким номером телефона уже существует')
    }
    dbContact = await this.getByName(contact.name, contact.creator)
    if (dbContact.length > 0) {
      throw ApiError.BadRequest('Контакт с таким именем уже существует')
    }
  }

  static async validateUpdateContact(contact: Contact) {
    if (contact.name.length > 39) {
      throw ApiError.BadRequest('Слишком длинное имя!')
    }
    let dbContact = await this.getByPhone(contact.phone, contact.creator)
    if (dbContact.filter(item => item.id != contact.id).length > 0) {
      throw ApiError.BadRequest('Контакт с таким номером телефона уже существует')
    }
    dbContact = await this.getByName(contact.name, contact.creator)
    if (dbContact.filter(item => item.id != contact.id).length > 0) {
      throw ApiError.BadRequest('Контакт с таким именем уже существует')
    }
  }

  static async create(contact: Contact) {
    await this.validateCreateContact(contact)
    try {
      const newContact = await pool.query(`
      INSERT INTO contacts 
      (creator, name, phone) 
      VALUES ('${contact.creator}', '${contact.name}', '${contact.phone}') RETURNING id, creator, name, phone;`)
      return newContact.rows[ 0 ]
    } catch (error) {
      console.log('error creating contact', error)
    }
  }

  static async update(id: string, contact: Contact) {
    await this.validateUpdateContact(contact)
    try {
      if (contact.name) {
        await pool.query(`UPDATE contacts SET name = '${contact.name}' WHERE id = ${id};`)
      }
      if (contact.phone) {
        await pool.query(`UPDATE contacts SET phone = '${contact.phone}' WHERE id = ${id};`)
      }
      return { id: id, ...contact }
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

  static async getByPhone(phone: string, creator: string) {
    try {
      const data = await pool.query<Contact>(`SELECT * FROM contacts WHERE phone = '${phone}' and creator='${creator}';`)
      return data.rows
    } catch (error) {
      console.log('error getting contacts', error)
    }
  }

  static async getByName(name: string, creator: string) {
    try {
      const data = await pool.query<Contact>(`SELECT * FROM contacts WHERE name = '${name}' and creator='${creator}';`)
      return data.rows
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

  static async delete(id: string) {
    try {
      const data = await pool.query(`DELETE FROM contacts WHERE id = '${id}';`)
      return data.rows
    } catch (error) {
      console.log('error deleting contact', error)
    }
  }
}