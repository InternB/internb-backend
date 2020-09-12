import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { ensureAdminAuthenticated } from '../middlewares/ensureRoleAuthenticated';

import UsersController from '../controllers/UsersController';
import AdminsController from '../controllers/AdminsController';

const usersRouter = Router();

const usersController = new UsersController();
const adminsController = new AdminsController();

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      fullname: Joi.string().required(),
      phone: Joi.string().allow('').optional(),
      role: Joi.number().min(0).max(3).required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/activate/:id',
  ensureAuthenticated,
  ensureAdminAuthenticated,
  adminsController.update,
);

usersRouter.delete('/', ensureAuthenticated, usersController.delete);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdminAuthenticated,
  adminsController.delete,
);

export default usersRouter;
