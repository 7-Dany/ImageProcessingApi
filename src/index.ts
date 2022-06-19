import express, { Application, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import images from './routes/images'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()

app.use(express.static('assets'))
app.use('/', images)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

// start express server
app.listen(PORT, () => {
  console.log(` Server is starting at http://localhost:${PORT}`)
})

export default app
