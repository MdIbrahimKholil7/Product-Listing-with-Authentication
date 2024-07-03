import { Router } from 'express'
import AuthController from '../controller/authController'
import container from '../config/inversify.config'
import TYPES from '../utils/appConsts'
import { validationMiddleware } from '../middlware/userValidationMiddlware/userRegistryValidation'
import UserRegisterDTO from '../dto/userDto/userRegistry.dto'

const authController = container.get<AuthController>(TYPES.AuthController)
const router = Router()

router.post(
  '/register',
  validationMiddleware(UserRegisterDTO),
  authController.register,
)
router.post('/login', authController.login)

export default router
