import { Router } from 'express'
import AuthController from '../controller/authController'
import container from '../config/inversify.config'
import TYPES from '../utils/appConsts'

const authController = container.get<AuthController>(TYPES.AuthController)
const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

export default router
