import { config } from 'dotenv'
import pg from 'pg'

const { Client } = pg
config()

const client = new Client()
await client.connect()

const { rows } = await client.query('SELECT * from public.users')
rows.forEach(console.log)
await client.end()
