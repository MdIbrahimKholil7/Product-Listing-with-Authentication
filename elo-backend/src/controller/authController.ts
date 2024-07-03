import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { IAuthService } from '../interface/IAuthService'
import TYPES from '../utils/appConsts'
import { catchAsync } from '../utils/catchAsync'
import AuthService from '../services/authService'

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  readonly register = catchAsync((req: Request, res: Response) => {
    const { name, password, email, address } = req.body
    const user = this.authService.register({ name, password, email, address })
    res.status(201).json(user)
  })

  readonly login = (req: Request, res: Response) => {}
}

export default AuthController
