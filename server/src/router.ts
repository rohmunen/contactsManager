import { Router } from "express";
import userController from "./controllers/user-controller";
const router = Router()

router.post('/signin', userController.signin)
 
export default router