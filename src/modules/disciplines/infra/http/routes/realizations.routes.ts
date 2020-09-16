import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureStudentAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';
import RealizationsController from '../controllers/RealizationsController';

const realizationsRouter = Router();

const realizationsController = new RealizationsController();

realizationsRouter.use(ensureAuthenticated);

realizationsRouter.post(
  '/',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      internship_id: Joi.string().uuid().required(),
      type: Joi.number().min(1).max(3).required(),
      names: Joi.array(),
    },
  }),
  realizationsController.create,
);

export default realizationsRouter;
