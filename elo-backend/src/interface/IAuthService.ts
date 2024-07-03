import User from '../model/userModel'

export interface IAuthService {
  register({ email, password, name, address }: User): User
  login(username: string, password: string): string | null
}
