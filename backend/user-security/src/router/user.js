import { Router } from 'express'

import { authorizationMandatoryMiddleware } from '../lib/validations.js'
import { userService } from '../services/user.js'

const userRouter = Router()

userRouter.post('/invite', authorizationMandatoryMiddleware, async (req, res) => {
  const { userId } = req.headers
  const { emailTarget } = req.body
  try {
    await userService.inviteUser({ emailTarget, userId })
    return res.sendStatus(200)
  } catch (err) {
    res.status(403).json({
      message: err.error
    })
  }
})

export { userRouter }
