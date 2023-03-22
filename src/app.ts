import errorHandler from './api/utils/errors/error-handler.js';
import express from 'express';
import cors from 'cors';
import authRouter from './api/auth/auth-router.js';
import bodyParser from 'body-parser';
import apiRouter from './api/api-router.js';

const app = express();

app.use(cors());
app.disable('x-powered-by');

app.get('/', (_req, res) => {
  res.json('Server ON');
});

app.use(express.json());
app.use('/auth', authRouter);
app.use(bodyParser.json());
app.use('/api/v1', apiRouter);
app.use(errorHandler);

export default app;
