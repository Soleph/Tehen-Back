import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'
import { Request, Response } from 'express'

export default async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, authConfig.secret)

    req.body.token = decode

    next()
  } catch (error) {
    return res.status(401).send({ mensagem: 'Failed Authenticate' })
  }
}
