import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService } from '../interface/IAuthService'

@injectable()
class AuthService implements IAuthService {
  private users: any = []

  public register(username: string, password: string): Record<string, any> {
    this.users.push({ username, password })
    return { username, password }
  }

  public login(username: string, password: string): string | null {
    return null
  }
}

export default AuthService
