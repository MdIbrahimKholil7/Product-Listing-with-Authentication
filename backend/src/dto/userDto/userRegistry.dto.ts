import { IsString, IsEmail, MinLength } from 'class-validator'

class UserRegisterDTO {
  @IsString()
  name!: string

  @IsEmail()
  email!: string

  @IsString()
  address!: string

  @IsString()
  @MinLength(7, { message: 'Password must be longer than 6 characters' })
  password!: string
}

export default UserRegisterDTO
