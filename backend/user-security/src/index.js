import express from 'express'
import { router } from './router/router.js'
import morgan from 'morgan'
import { mySQLRepository } from './repository/mysql.js'
import { setRepository } from './repository/repository.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const { PORT } = process.env

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
router(app)

// init repo
setRepository(mySQLRepository)

app.listen(PORT, () => console.log(`Server ready on ${PORT}`))
