import express from 'express';
import authRouter from './routes';
import { config } from 'dotenv'

const app = express();
config()

app.use(express.json());
app.use(authRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on this url http://localhost:${process.env.PORT}`);
});
