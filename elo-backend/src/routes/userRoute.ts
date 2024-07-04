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
    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterDTO'
     *     responses:
     *       200:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TokenResponse'
     *       400:
     *         description: Invalid request body or user already exists
     */
    this.router.post(
      '/register',
      validationMiddleware(UserRegisterDTO),
      this.authController.register,
    )
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login with credentials
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginDTO'
     *     responses:
     *       200:
     *         description: User logged in successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TokenResponse'
     *       401:
     *         description: Invalid email or password
     */
    this.router.post(
      '/login',
      validationMiddleware(UserLoginDTO),
      this.authController.login,
    )
  }
}

export default AuthRoutes
