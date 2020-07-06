import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: number;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('JWT token is missing', 401);

  const [, token] = authorization.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub, role } = decoded as ITokenPayload;

    const usersRepository = container.resolve<IUsersRepository>(
      'UsersRepository',
    );

    const user = await usersRepository.userExists(sub);

    if (!user) throw new AppError('User blocked from the service', 401);

    request.user = { id: sub, role };

    return next();
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError('Invalid JWT token', 401);
  }
}
