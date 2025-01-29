import express from 'express'
import { config } from 'dotenv'
import { errorHandler } from '../shared/middlewares/errorHandler'
import { adminRouter, productRouter } from './routers'
import { listRoutes } from '../shared/logging/routes'

const app = express()
config()

app.use(express.json());

app.use('/api/admin', adminRouter)
app.use('/api', productRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on this url http://localhost:${process.env.PORT}`)
  listRoutes(app)
});
