import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token-service';
import contactService from '../services/contact-service';

class ContactsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone } = req.body
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const { id } = tokenService.validateAccessToken(authorizationHeader)
      const result = await contactService.create({creator: id, name, phone})
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }
}

export default new ContactsController()