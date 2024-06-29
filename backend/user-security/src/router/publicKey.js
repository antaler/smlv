import { Router } from 'express'
import { publicKey } from '../lib/keys.js'

const publicKeyRouter = Router()

publicKeyRouter.get('/', (_, res) => res.setHeader('Content-type', 'text/plain').send(publicKey))

export { publicKeyRouter }
