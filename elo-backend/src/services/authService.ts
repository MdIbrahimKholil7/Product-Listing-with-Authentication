import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService, ILoginArgs, LoginType } from '../interface/IAuthService'
import User from '../model/userModel'
import AppError from '../utils/appError'
import status from 'http-status'
import { config } from '../config/config'
@injectable()
class AuthService implements IAuthService {
  private users: User[] = []

  public register(user: User): LoginType {
    const { name, password, email, address } = user
    const existingUser = this.users.find(u => u.email === email)
    if (existingUser) {
      throw new AppError(`User ${email} already exists`, status.CONFLICT)
    }
    const hashedPassword = bcrypt.hashSync(password, 8)
    const newUser = new User(name, email, address, hashedPassword)
    this.users.push(newUser)
    const token = jwt.sign({ email, name, address }, config.JWT_SECRET, {
      expiresIn: config.EXPIRES_IN,
    })
    const { password: userPassword, ...userData } = newUser
    return { token, user: userData }
  }

  public login({ email, password }: ILoginArgs): LoginType {
    const user = this.users.find(u => u.email === email)
    if (!user) throw new AppError('Invalid email', 401)
    const { password: userPassword, ...userData } = user
    if (user && bcrypt.compareSync(password, userPassword)) {
      const token = jwt.sign(
        { email: user.email, name: user.name, address: user.address },
        config.JWT_SECRET,
        {
          expiresIn: config.EXPIRES_IN,
        },
      )

      return { token, user: userData }
    }
    throw new AppError('Invalid password', 401)
  }
}

export default AuthService
