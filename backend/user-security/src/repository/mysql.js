import { User } from '../db/db.js'

const mySQLRepository = {
  findUserById (userId) {
    return User.findOne({
      where: {
        id: userId
      }
    })
  },
  findUserByEmail (email) {
    return User.findOne({
      where: {
        email
      }
    })
  },
  async saveUser (user) {
    return await new User(user).save()
  }

}

export { mySQLRepository }
