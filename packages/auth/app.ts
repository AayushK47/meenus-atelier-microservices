import express from 'express';
import authRouter from './routes';
import { config } from 'dotenv'
import { errorHandler } from '../shared/middlewares/errorHandler';

const app = express();
config()

app.use(express.json());
app.use(authRouter)

app.use(errorHandler)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on this url http://localhost:${process.env.PORT}`);
});
