import { Router } from "express";
const router = Router()

router.get('/signin', (req, res, next) => {
  res.json({
    message: 'ok'
  })
})
 
export default router