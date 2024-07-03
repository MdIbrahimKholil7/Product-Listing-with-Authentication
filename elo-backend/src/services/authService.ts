import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService } from '../interface/IAuthService'
import User from '../model/userModel'
import AppError from '../utils/appError'
import status from 'http-status'
@injectable()
class AuthService implements IAuthService {
  private users: User[] = []

  public register(user: User): User {
    const { name, password, email, address } = user
    const existingUser = this.users.find(u => u.email === email)
    if (existingUser) {
      throw new AppError(`User ${email} already exists`, status.CONFLICT)
    }
    const hashedPassword = bcrypt.hashSync(password, 8)
    const newUser = new User(name, email, address, hashedPassword)
    this.users.push(newUser)
    return newUser
  }

  public login(username: string, password: string): string | null {
    return null
  }
}

export default AuthService
