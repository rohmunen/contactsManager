import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token-service';
import contactService from '../services/contact-service';
import { Contact } from '../database/models/contact-model';

class ContactsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone } = req.body
      const authorizationHeader = req.header('Authorization').split(' ')[ 1 ]
      const { id } = tokenService.validateAccessToken(authorizationHeader)
      const result = await contactService.create({ creator: id, name, phone })
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[ 1 ]
      const { id } = tokenService.validateAccessToken(authorizationHeader)
      const data = await contactService.getByUserId(id)
      return res.json(data)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request<{id: string}, {}, Contact>, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[ 1 ]
      const contactId = req.params.id
      const { id } = tokenService.validateAccessToken(authorizationHeader)
      const contactData = req.body
      const result = await contactService.update(contactId, id, contactData)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }
}

export default new ContactsController()