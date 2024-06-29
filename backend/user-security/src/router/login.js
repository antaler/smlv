import { Router } from 'express'
import { loginService } from '../services/login.js'
import { authorizationMandatoryMiddleware, invitedTokenValidationMidddleware, userBodyValidationMiddleware } from '../lib/validations.js'

const loginRouter = Router()

loginRouter.post('/otp', async (req, res) => {
  const { otpValue, email } = req.body
  try {
    const result = await loginService.otpValidate({ email, otpValue })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(401)
  }
})

loginRouter.get('/otp', async (req, res) => {
  const { email } = req.query
  if (!email) {
    return res.status(204).send()
  }
  try {
    const result = await loginService.isOtp({ email })
    res.status(result ? 200 : 204).send()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

loginRouter.post('/sign-in', async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await loginService.signIn({ email, password })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(401).send()
  }
})

loginRouter.get('/sign-up/validate', invitedTokenValidationMidddleware('query'), async (req, res) => {
  const {
    invitedToken
  } = req.query
  try {
    const isOk = await loginService.validateInvitationToken(invitedToken)
    return res.status(isOk ? 200 : 401).send()
  } catch (err) {
    res.status(401).send()
  }
})

loginRouter.post('/sign-up', invitedTokenValidationMidddleware('body'), userBodyValidationMiddleware, async (req, res) => {
  const {
    invitedToken,
    user
  } = req.body
  try {
    const token = await loginService.registerNewUserByInvitationToken(invitedToken, user)
    return res.status(201).json(token)
  } catch (err) {
    console.log(err)
    res.status(401).send()
  }
})

loginRouter.get('/refresh', authorizationMandatoryMiddleware, async (req, res) => {
  const { userId } = req.headers
  const token = await loginService.refresh(userId)
  res.status(200).json(token)
})

export { loginRouter }
