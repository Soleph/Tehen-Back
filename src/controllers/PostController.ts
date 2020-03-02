import { Request, Response } from 'express'

import { Post } from '../schemas/Post'

class PostController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query

    const options = {
      sort: { createdAt: -1 },
      page,
      limit: 10,
      lean: true
    }

    const posts = await Post.paginate({}, options)

    return res.json(posts)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const post = await Post.create(req.body)

    return res.json(post)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const post = await Post.findById(req.params.id)

    return res.json(post)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(post)
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    await Post.findByIdAndRemove(req.params.id)

    return res.json('sucess')
  }
}

export default new PostController()
