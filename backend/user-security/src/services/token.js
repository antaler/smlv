import jwt from 'jsonwebtoken'

import { privateKey, privateKeyInvite, publicKey, publicKeyInvite } from '../lib/keys.js'

const INVITE_TOKEN_TIME = 24 * 60 * 60 * 1000

const fixedTokenMetadata = {
  expiresTime: 15 * 60 * 1000,
  issuer: 'SMLV'

}

function sign ({ payload, userId, expiresTime, pvKey }) {
  return jwt.sign(payload, pvKey ?? privateKey, {
    algorithm: 'RS256',
    expiresIn: expiresTime ?? `${fixedTokenMetadata.expiresTime}ms`,
    issuer: fixedTokenMetadata.issuer,
    subject: userId
  })
}

async function validate ({ token, pbKey }) {
  const result = await jwt.verify(token, pbKey, {
    algorithms: ['RS256'],
    issuer: 'SMLV',
    complete: false
  })
  if (typeof result === 'string') {
    return result
  } else {
    return JSON.stringify(result)
  };
}

async function generateInvitationToken ({ emailTarget, sourceUserId: userId }) {
  const payload = {
    emailTarget,
    invitation: true
  }

  return sign({ payload, userId, expiresTime: INVITE_TOKEN_TIME, pvKey: privateKeyInvite })
}

export const tokenService = {
  generateToken (userId, alias) {
    const payload = alias ? { alias } : {}
    return sign({
      payload,
      userId
    })
  },
  generateInvitationToken,
  validate: (token) => {
    return validate({
      token, pbKey: publicKey
    })
  },
  validateInvitation: (token) => {
    return validate({ token, pbKey: publicKeyInvite })
  }
}
