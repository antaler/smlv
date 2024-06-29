import { Router } from 'express'

export const healthChecksRouter = Router().get('/', (_, res) => res.send('OK'))
