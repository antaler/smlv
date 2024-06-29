let _repository

class Repository {
  findAllHealthsByUserId (userId) {
    return _repository.findAllHealthsByUserId(userId)
  }

  findHealthByUserId (userId) {
    return _repository.findHealthByUserId(userId)
  }

  findUserAndHealthByUserId (userId) {
    return _repository.findUserAndHealthByUserId(userId)
  }

  findUserByEmail (email) {
    return _repository.findUserByEmail(email)
  }

  findUserById (userId) {
    return _repository.findUserById(userId)
  }

  isUserVerified (id) {
    return _repository.isUserVerified(id)
  }

  lastOtp (id) {
    return _repository.lastOtp(id)
  }

  saveUser (user) {
    return _repository.saveUser(user)
  }
}

export const repository = new Repository()

export function setRepository (repository) {
  _repository = repository
}
