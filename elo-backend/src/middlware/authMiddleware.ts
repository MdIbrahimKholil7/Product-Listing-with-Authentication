import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import AppError from '../utils/appError'
import { config } from '../config/config'

dotenv.config()

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: No token provided', 401))
  }

  const token = authHeader.split(' ')[1]

  try {
    let verifiedUser = null
    verifiedUser = jwt.verify(token, config.JWT_SECRET as Secret) as JwtPayload
    req.user = verifiedUser
    next()
  } catch (error) {
    return next(new AppError('Unauthorized: Invalid token', 401))
  }
}

export default authMiddleware
