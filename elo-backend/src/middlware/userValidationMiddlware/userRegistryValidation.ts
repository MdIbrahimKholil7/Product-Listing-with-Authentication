import { Request, Response, NextFunction } from 'express'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

export const validationMiddleware = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToClass(dtoClass, req.body)
    validate(dtoInstance).then(errors => {
      if (errors.length > 0) {
        const messages = errors.map(error =>
          Object.values(error.constraints || {}).join(', '),
        )
        res.status(400).json({ errors: messages })
      } else {
        next()
      }
    })
  }
}
