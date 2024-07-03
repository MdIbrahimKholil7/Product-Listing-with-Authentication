import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

export const config = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  EXPIRES_IN: process.env.EXPIRES_IN as string,
}
