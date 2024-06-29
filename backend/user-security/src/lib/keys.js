import { createPublicKey } from 'crypto'
import fs from 'fs/promises'

const { PRIVATE_KEY_FILE, PRIVATE_KEY_FILE_INVITE } = process.env

async function readKey ({ privateKeyFile }) {
  const privateKey = (await fs.readFile(privateKeyFile)).toString()
  const publicKey = createPublicKey(privateKey).export({ format: 'pem', type: 'pkcs1' }).toString()
  return {
    privateKey,
    publicKey
  }
}

export const { privateKey, publicKey } = await readKey({
  privateKeyFile: PRIVATE_KEY_FILE || ''
})

export const { privateKey: privateKeyInvite, publicKey: publicKeyInvite } = await readKey({
  privateKeyFile: PRIVATE_KEY_FILE_INVITE || ''
})
