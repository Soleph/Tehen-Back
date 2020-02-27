import { Schema, Model, model, HookNextFunction } from 'mongoose'
import { UserInterface } from '../interfaces/User'

import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

UserSchema.pre<UserInterface>('save', async function (next: Function): Promise<HookNextFunction> {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  return next()
})

export const User: Model<UserInterface> = model<UserInterface>('User', UserSchema)
