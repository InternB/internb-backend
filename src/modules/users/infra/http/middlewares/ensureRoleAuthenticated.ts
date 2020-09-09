import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export async function ensureAdminAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { role } = request.user;
  if (role !== 0)
    throw new AppError('Must be an Admin to access this service', 403);

  return next();
}

export async function ensureProfessorAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { role } = request.user;
  if (role !== 1)
    throw new AppError('Must be a Professor to access this service', 403);

  return next();
}

// export async function ensurePreceptorAuthenticated(
//   request: Request,
//   _: Response,
//   next: NextFunction,
// ): Promise<void> {
//   const { role } = request.user;
//   if (role !== 2)
//     throw new AppError('Must be a Preceptor to access this service', 403);

//   return next();
// }

export async function ensureStudentAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { role } = request.user;
  if (role !== 3)
    throw new AppError('Must be a Student to access this service', 403);

  return next();
}
