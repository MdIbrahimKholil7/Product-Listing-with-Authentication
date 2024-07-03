import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { IAuthService, ILoginArgs } from '../interface/IAuthService'
import TYPES from '../utils/appConsts'
import { catchAsync } from '../utils/catchAsync'
import AuthService from '../services/authService'
import UserLoginDTO from '../middlware/userValidationMiddlware/userLoginValidation'

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  readonly register = catchAsync((req: Request, res: Response) => {
    const { name, password, email, address } = req.body
    const data = this.authService.register({ name, password, email, address })
    res.status(201).json({ data })
  })

  readonly login = catchAsync((req: Request, res: Response) => {
    const loginArgs: ILoginArgs = req.body as UserLoginDTO
    const data = this.authService.login(loginArgs)
    res.status(200).json({ data })
  })
}

export default AuthController
