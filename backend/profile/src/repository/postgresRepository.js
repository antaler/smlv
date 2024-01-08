import pg from 'pg'
const { Pool } = pg
const pool = new Pool()

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const queryFindByUsername = 'SELECT username, name, email, avatar_url , is_woman , birth_day, height, weight FROM public.users WHERE USERNAME = $1'

export const postgresRepository = {

  async findUserByUsername ({ username }) {
    const res = await pool.query(queryFindByUsername, [username])
    return res.rows[0]
  },

  async updateUserByUsername ({ username, userData }) {
    const { email, name, isWoman, birthDay, height, weight } = userData
    const client = await pool.connect()
    const res = await client.query('UPDATE public.users SET email = $1, name = $2, is_woman = $3, birth_day = $4, height = $5,weight = $6 WHERE username = $7', [email, name, isWoman, birthDay, height, weight, username])
    client.release()

    return { wasUpdate: res.rowCount > 0 }
  },

  async deleteUserByUsername ({ username }) {
    const client = await pool.connect()
    const res = await client.query('DELETE FROM public.users WHERE username = $1', [username])
    client.release()
    return { wasDeleted: res.rowCount > 0 }
  }

}
