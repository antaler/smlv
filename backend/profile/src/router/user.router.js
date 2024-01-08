import { Router } from 'express'
import { repository } from '../repository/index.js'
import { validateUser } from '../schemas/user.schema.js'
// import { auth } from '../middlewares/auth.js'
export const userRouter = Router()

function extractUserData (req) {
  const { authorization } = req.headers
  const tokenPart = Buffer.from(authorization.replace('token ', ' ').split('.')[1], 'base64').toString()
  const { user_metadata: userData } = JSON.parse(tokenPart)
  return userData
}

userRouter
  .route('/me')
  .get(async (req, res) => {
    const { user_name: username } = extractUserData(req)

    const user = await repository.findUserByUsername({ username })

    if (!user) {
      res.sendStatus(401)
    } else {
      const { is_woman: isWoman, birth_day: birthDay, height, weight, ...other } = user
      const gender = isWoman ? 'W' : 'M'
      res.status(200).json({
        ...other,
        health: {
          gender: isWoman === null ? null : gender,
          birthDay,
          height,
          weight
        }
      })
    }
  })
  .delete(async (req, res) => {
    const { user_name: username } = extractUserData(req)

    const { wasDeleted } = await repository.deleteUserByUsername({ username })

    if (wasDeleted) {
      res.sendStatus(204)
    } else {
      res.status(500).json({ message: 'the register can\'t be deleted' })
    }
  }).patch(async (req, res) => {
    const { user_name: username } = extractUserData(req)
    const userValidated = validateUser(req.body)
    if (!userValidated.success) {
      return res.status(400).json(JSON.parse(userValidated.error.message))
    }
    const { data: userData } = userValidated

    if (Object.keys(userData).length === 0) {
      console.log('no data')
      return res.status(204).send()
    }
    const currentUser = await repository.findUserByUsername({ username })

    if (!currentUser) {
      return res.status(500).json({ message: "the register can't be updated" })
    }
    Object.entries(userData).filter(([, value]) => value).forEach(([key, value]) => {
      if (key === 'gender') {
        currentUser.isWoman = value === 'W'
      } else {
        currentUser[key] = value
      }
    })
    console.log(currentUser)

    const { wasUpdated } = repository.updateUserByUsername({ username, userData: currentUser })

    if (wasUpdated) {
      res.status(500).json({ message: 'the register can\'t be updated' })
    } else {
      res.sendStatus(204)
    }
  })
