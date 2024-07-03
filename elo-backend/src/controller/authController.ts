import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { IAuthService } from '../interface/IAuthService'
import TYPES from '../utils/appConsts'
import { catchAsync } from '../utils/catchAsync'

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}

  readonly register = catchAsync((req: Request, res: Response) => {
    const { name, password } = req.body
    const user = this.authService.register(name, password)
    res.status(201).json(user)
  })

  readonly login = (req: Request, res: Response) => {}
}

export default AuthController
