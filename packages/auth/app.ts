import express from 'express';
import { config } from 'dotenv'
import { errorHandler } from '../shared/middlewares/errorHandler';
import { authRouter, adminRouter } from './routers';

const app = express();
config()

app.use(express.json());
app.use('/api', authRouter)
app.use('/api/admin/', adminRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on this url http://localhost:${process.env.PORT}`);
});
