import { Router } from "express";
import contactsController from "./controllers/contacts-controller";
import userController from "./controllers/user-controller";
const router = Router()

router.post('/signup', userController.signin)
router.post('/login', userController.login)
router.post('/contact', contactsController.create)
 
export default router