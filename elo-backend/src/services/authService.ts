import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService } from '../interface/IAuthService'
import User from '../model/userModel'

@injectable()
class AuthService implements IAuthService {
  private users: User[] = []

  public register(user: User): User {
    this.users.push(user)
    return user
  }

  public login(username: string, password: string): string | null {
    return null
  }
}

export default AuthService
