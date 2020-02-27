import { Document } from 'mongoose'

export interface UserInterface extends Document {
  name?: string
  email?: string
  password?: string
  checkPassword?: Function
  createdAt?: Date
  updatedAt?: Date
}
