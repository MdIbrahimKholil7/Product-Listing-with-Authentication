import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService, ILoginArgs, LoginType } from '../interface/IAuthService'
import User from '../model/userModel'
import AppError from '../utils/appError'
import status from 'http-status'
import { config } from '../config/config'
import httpStatus from 'http-status'

@injectable()
class AuthService implements IAuthService {
  private users: Map<string, User>

  constructor() {
    this.users = new Map<string, User>()
  }

  register(payload: User): LoginType {
    const { name, password, email, address } = payload

    if (this.users.has(email)) {
      throw new AppError(`User ${email} already exists`, httpStatus.CONFLICT)
    }

    const hashedPassword = bcrypt.hashSync(password, 8)
    const newUser = new User(name, email, address, hashedPassword)
    this.users.set(email, newUser)

    const token = jwt.sign({ email, name, address }, config.JWT_SECRET, {
      expiresIn: config.EXPIRES_IN,
    })

    const { password: userPassword, ...userData } = newUser
    return { token, user: userData }
  }

  login(payload: ILoginArgs): LoginType {
    const { email, password } = payload
    const user = this.users.get(email)

    if (!user) {
      throw new AppError('Invalid email', httpStatus.UNAUTHORIZED)
    }

    const { password: userPassword, ...userData } = user

    if (bcrypt.compareSync(password, userPassword)) {
      const token = jwt.sign(
        { email: user.email, name: user.name, address: user.address },
        config.JWT_SECRET,
        {
          expiresIn: config.EXPIRES_IN,
        },
      )

      return { token, user: userData }
    }

    throw new AppError('Invalid password', httpStatus.UNAUTHORIZED)
  }
}

export default AuthService
