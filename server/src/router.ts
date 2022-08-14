import { Router } from "express";
import contactsController from "./controllers/contacts-controller";
import userController from "./controllers/user-controller";
import { authMiddleware } from "./middlewares/auth-middleware";
const router = Router()

router.post('/signup', userController.signup)
router.post('/signin', userController.login)
router.post('/contacts', authMiddleware, contactsController.create)
router.get('/contacts', authMiddleware, contactsController.get)
router.get('/check', userController.check)
router.get('/refresh', userController.refresh)
router.put('/contacts/:id', authMiddleware, contactsController.update)
router.delete('/contacts/:id', authMiddleware, contactsController.delete)
 
export default router