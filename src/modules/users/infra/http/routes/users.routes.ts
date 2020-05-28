import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      fullname: Joi.string().required(),
      phone: Joi.string().optional(),
      role: Joi.number().min(0).max(3).required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
