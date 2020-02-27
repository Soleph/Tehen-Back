import { Schema, model, PaginateModel } from 'mongoose'
import { PostInterface } from '../interfaces/Post'

import mongoosePaginate from 'mongoose-paginate-v2'

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

PostSchema.plugin(mongoosePaginate)

export const Post: PaginateModel<PostInterface> = model<PostInterface>('Post', PostSchema)
