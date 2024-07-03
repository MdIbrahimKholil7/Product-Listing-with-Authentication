export interface IAuthService {
  register(username: string, password: string): Record<string, any>
  login(username: string, password: string): string | null
}
