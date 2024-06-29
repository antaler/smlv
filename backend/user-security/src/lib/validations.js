import { tokenService } from '../services/token.js'

const authorizationMandatoryMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || authorization.trim() === '') {
    res.status(401).json({
      message: 'the header Authorization is mandatory.'
    })
    return
  }
  try {
    const token = await tokenService.validate(authorization.startsWith('Bearer ') ? authorization.split(' ')[1] : authorization)
    const { sub } = JSON.parse(token)
    console.log(JSON.parse(token))
    req.headers.userId = sub
  } catch (err) {
    console.log(err)
    return res.sendStatus(401)
  }

  next()
}

const VALIDATORS = Object.freeze({
  ALIAS: 50,
  GENDER: ['M', 'W'],
  PASSWORD: /^(?=.*[A-Z])(?=.*[!@#$&*?_\\-\s])(?=.*[0-9])(?=.*[a-z]).{8}$/

})
const userBodyValidationMiddleware = async (req, res, next) => {
  const { user } = req.body
  if (!user) {
    return res.status(400).json({
      message: 'Remeaning mandatory fields'
    })
  }
  const { alias, email, password } = user
  if (!alias || !email || !password) {
    return res.status(400).json({
      message: 'Remeaning mandatory fields'
    })
  }

  if (alias.length > VALIDATORS.ALIAS || !VALIDATORS.PASSWORD.test(password)) {
    return res.status(400).json({
      message: 'fields values are not permitted'
    })
  }
  next()
}

const invitedTokenValidationMidddleware = (origin) => async (req, res, next) => {
  const { invitedToken } = req[origin]
  if (!invitedToken) {
    return res.status(400).json({
      message: 'Remeaning mandatory fields'
    })
  }
  next()
}

export { authorizationMandatoryMiddleware, userBodyValidationMiddleware, invitedTokenValidationMidddleware }
