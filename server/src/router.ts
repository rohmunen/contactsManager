import { Router } from "express";
import userController from "./controllers/user-controller";
const router = Router()

router.post('/signup', userController.signin)
router.post('/login', userController.login)
 
export default router