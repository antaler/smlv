import express from 'express'
import { config } from 'dotenv'
import { router } from './src/router/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

config()

const PORT = process.env.PORT ?? 8080

const app = express()
app.disable('x-powered-by')
app.disable('etag')
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

router(app)

app.use((req, res) => res.status(404).send('<h1>404</h1>'))

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`))
