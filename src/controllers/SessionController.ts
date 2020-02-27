import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

import { Request, Response } from 'express'

import { User } from '../schemas/User'

class SessionController {
  public async store (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(401).json('User not found')
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' })
    }
    const { _id, name } = user

    return res.json({
      user: {
        _id,
        name,
        email
      },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
