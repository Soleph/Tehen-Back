import { Schema, Model, model } from 'mongoose'
import { PostInterface } from '../interfaces/Post'

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

export const Post: Model<PostInterface> = model<PostInterface>('Post', PostSchema)
