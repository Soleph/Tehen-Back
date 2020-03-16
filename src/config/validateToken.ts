import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'
import { Request, Response } from 'express'
import { User } from '../schemas/User'

export default async (req: Request, res: Response, next: Function): Promise<Response> => {
  const [, token] = req.headers.authorization.split(' ')
  try {
    const payload = await jwt.verify(token, authConfig.secret)
    const user = await User.findById(payload)

    if (!user) {
      return res.send(401)
    }

    req.body.auth = user

    next()
  } catch (error) {
    return res.status(401).send({ mensagem: 'Failed Authenticate' })
  }
}
