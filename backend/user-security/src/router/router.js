import { healthChecksRouter } from './healthcheck.js'
import { loginRouter } from './login.js'
import { publicKeyRouter } from './publicKey.js'
import { userRouter } from './user.js'

export function router (app) {
  app.use('/health-check', healthChecksRouter)
  app.use('/user', userRouter)
  app.use('/public-key', publicKeyRouter)
  app.use('/login', loginRouter)
}
