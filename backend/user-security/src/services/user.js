import { repository } from '../repository/repository.js'
import { sendInviteUser } from './email.js'
import { tokenService } from './token.js'

async function inviteUser ({ emailTarget, userId }) {
  const user = await repository.findUserById(userId)
  if (user.invitations <= 0) {
    throw new Error("User haven't got more invitations")
  }
  const token = await tokenService.generateInvitationToken({
    emailTarget,
    sourceUserId: userId
  })
  sendInviteUser({
    tokenInvite: token,
    email: emailTarget
  })
}

export const userService = {
  inviteUser
}
