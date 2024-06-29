import { genSalt, hash, compare as _compare } from 'bcrypt'

const saltRounds = 12

export async function encrypt (pass) {
  const salt = await genSalt(saltRounds)
  const passHashed = await hash(pass, salt)
  return passHashed
}

export async function compare ({
  passHashed,
  passInput
}) {
  return await _compare(passInput, passHashed)
}
