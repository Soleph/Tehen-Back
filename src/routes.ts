import { Router } from 'express'

import validateToken from './config/validateToken'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import PostController from './controllers/PostController'

import validateUserStore from './validators/UserStore'
import validateSessionStore from './validators/SessionStore'
import validatePost from './validators/Post'

const routes = Router()

routes.post('/users', validateToken, validateUserStore, UserController.store)

routes.post('/sessions', validateSessionStore, SessionController.store)
routes.get('/sessions', validateToken, SessionController.index)

routes.get('/posts', PostController.index)
routes.post('/posts', validateToken, validatePost, PostController.store)
routes.get('/posts/:id', PostController.show)
routes.put('/posts/:id', validateToken, validatePost, PostController.update)
routes.delete('/posts/:id', validateToken, PostController.delete)

export default routes
