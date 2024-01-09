import { postgresRepository } from './postgresRepository.js'

export const repository = {

  async findUserByUsername ({ username }) {
    return postgresRepository.findUserByUsername({ username })
  },

  async updateUserByUsername ({ username, userData }) {
    return postgresRepository.updateUserByUsername({ username, userData })
  },

  async deleteUserByUsername ({ username }) {
    return postgresRepository.deleteUserByUsername({ username })
  }

}
