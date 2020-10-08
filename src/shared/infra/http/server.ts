import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/container';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '../typeorm';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images/profiles', express.static(uploadConfig.profilesFolder));
app.use(routes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}! 🚀 `);
});
