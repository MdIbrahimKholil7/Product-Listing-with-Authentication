import { IsEmail, IsString } from 'class-validator'

class UserLoginDTO {
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}

export default UserLoginDTO
