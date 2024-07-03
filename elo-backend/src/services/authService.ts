import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService } from '../interface/IAuthService'
import User from '../model/userModel'

@injectable()
class AuthService implements IAuthService {
  private users: User[] = []

  public register(user: User): User {
    const { name, password, email, address } = user
    const existingUser = this.users.find(u => u.email === email)
    if (existingUser) {
      throw new Error(`User ${email} already exists`)
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
