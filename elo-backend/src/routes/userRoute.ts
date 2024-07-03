import { Router } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../utils/appConsts'

import UserRegisterDTO from '../dto/userDto/userRegistry.dto'
import { validationMiddleware } from '../middlware/userValidationMiddlware/userRegistryValidation'
import AuthController from '../controller/authController'
import UserLoginDTO from '../middlware/userValidationMiddlware/userLoginValidation'

@injectable()
class AuthRoutes {
  public router: Router

  constructor(
    @inject(TYPES.AuthController) private authController: AuthController,
  ) {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      '/register',
      validationMiddleware(UserRegisterDTO),
      this.authController.register,
    )
    this.router.post(
      '/login',
      validationMiddleware(UserLoginDTO),
      this.authController.login,
    )
  }
}

export default AuthRoutes
