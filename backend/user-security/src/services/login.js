import { compare, encrypt } from '../lib/bcrypt.js'
import { generateOTP, requireOTP } from '../lib/otp.js'
import { repository } from '../repository/repository.js'
import { sendOTPEmail } from './email.js'
import { tokenService } from './token.js'

async function signIn ({ email, password }) {
  const user = await repository.findUserByEmail(email)
  if (!user) {
    throw new Error('User not found')
  }
  const areEquals = await compare({
    passHashed: user.password,
    passInput: password
  })

  if (!areEquals) {
    throw new Error('Not Authorized')
  }

  if (requireOTP(user.last_otp)) {
    const otp = generateOTP()
    user.otp = otp
    user.save()
    sendOTPEmail({
      email, otp
    })
    return {
      otp: true
    }
  }

  return { token: tokenService.generateToken(user.id, user.alias) }
}

async function otpValidate ({ otpValue, email }) {
  const user = await repository.findUserByEmail(email)
  if (!user) {
    throw new Error('User not found')
  }
  if (user.otp === otpValue) {
    user.last_otp = new Date()
    user.otp = ''
    user.save()
    return { token: tokenService.generateToken(user.id, user.alias) }
  } else {
    throw new Error('Otp not Valid!')
  }
}

async function isOtp ({ email }) {
  const user = await repository.findUserByEmail(email)
  if (!user) {
    return false
  }
  return !!user.otp
}

async function registerNewUserByInvitationToken (invitationToken, userDto) {
  const tokenDecoded = await tokenService.validateInvitation(invitationToken)
  const { emailTarget, sub } = JSON.parse(tokenDecoded)
  if (emailTarget !== userDto.email) {
    throw new Error("The user can't be register ensure the email was the invited email")
  }

  const existsUser = await repository.findUserByEmail(emailTarget)

  if (existsUser) {
    throw new Error('Users can\'t be created')
  }
  const userInvitator = await repository.findUserById(sub)
  if (userInvitator.invitations <= 0) {
    throw new Error("the user can't be created")
  }
  userInvitator.invitations = userInvitator.invitations - 1
  userInvitator.save()

  const passEncrypted = await encrypt(userDto.password)

  const user = await repository.saveUser({
    alias: userDto.alias,
    email: userDto.email,
    gender: userDto.gender,
    password: passEncrypted,
    last_otp: new Date(),
    verified: true
  })
  return { token: tokenService.generateToken(user.id, user.alias) }
}

async function validateInvitationToken (invitationToken) {
  const tokenDecoded = await tokenService.validateInvitation(invitationToken)
  const { emailTarget } = JSON.parse(tokenDecoded)
  if (!emailTarget) {
    return false
  }

  return true
}

async function refresh (userId) {
  const user = await repository.findUserById(userId)
  return { token: tokenService.generateToken(user.id, user.alias) }
}

export const loginService = {
  signIn,
  otpValidate,
  registerNewUserByInvitationToken,
  refresh,
  isOtp,
  validateInvitationToken
}
