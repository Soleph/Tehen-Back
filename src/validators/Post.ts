import * as Yup from 'yup'
import { Request, Response } from 'express'

export default async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
      author: Yup.string().required()
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner })
  }
}
