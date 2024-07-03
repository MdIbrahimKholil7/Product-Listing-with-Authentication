import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from '../utils/appConsts'
import { IAuthService } from '../interface/IAuthService'
import AuthService from '../services/authService'
import AuthController from '../controller/authController'

const container = new Container()

container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<AuthController>(TYPES.AuthController).to(AuthController)
export default container
