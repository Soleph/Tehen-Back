import { Document } from 'mongoose'

export interface PostInterface extends Document {
  title?: string
  content?: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
}
