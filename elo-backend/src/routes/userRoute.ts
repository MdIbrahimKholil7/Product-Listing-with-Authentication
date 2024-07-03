import { Router } from 'express'
import AuthController from '../controller/authController'
import container from '../config/inversify.config'
import TYPES from '../utils/appConsts'
import { validationMiddleware } from '../middlware/userValidationMiddlware/userRegistryValidation'
import UserRegisterDTO from '../dto/userDto/userRegistry.dto'
import UserLoginDTO from '../middlware/userValidationMiddlware/userLoginValidation'

const authController = container.get<AuthController>(TYPES.AuthController)
const router = Router()

router.post(
  '/register',
  validationMiddleware(UserRegisterDTO),
  authController.register,
)
router.post('/login', validationMiddleware(UserLoginDTO), authController.login)

export default router
