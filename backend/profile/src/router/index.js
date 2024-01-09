import { userRouter } from './user.router.js'

export function router (app) {
  app.use('/v1/user', userRouter)
}
