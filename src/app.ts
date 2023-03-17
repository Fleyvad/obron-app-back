import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './api/auth/auth-router.js';
import errorHandler from './api/utils/errors/error-handler.js';

const app = express();

app.disable('x-powered-by');

app.use(cors());

app.get('/', (_req, res) => {
  res.json('Server ON');
});

app.use(express.json());
app.use('/auth', authRouter);
app.use(bodyParser.json());

app.use(errorHandler);

export default app;
