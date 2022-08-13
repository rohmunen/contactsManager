import { Router } from "express";
import contactsController from "./controllers/contacts-controller";
import userController from "./controllers/user-controller";
const router = Router()

router.post('/signup', userController.signin)
router.post('/login', userController.login)
router.post('/contacts', contactsController.create)
router.get('/contacts', contactsController.get)
router.get('/refresh', userController.refresh)
router.put('/contacts/:id', contactsController.update)
router.delete('/contacts/:id', contactsController.delete)
 
export default router