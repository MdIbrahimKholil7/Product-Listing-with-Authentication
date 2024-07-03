import User from '../model/userModel'

export interface IAuthService {
  register({ email, password, name, address }: User): LoginType
  login({ email, password }: ILoginArgs): LoginType
}

export interface ILoginArgs {
  email: string
  password: string
}
export interface LoginType {
  token: string
  user: Omit<User, 'password'>
}
