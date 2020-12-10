import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureStudentAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';
import ActivitiesController from '../controllers/ActivitiesController';

const activitiesRouter = Router();

const activitiesController = new ActivitiesController();

activitiesRouter.use(ensureAuthenticated);

activitiesRouter.post(
  '/',
  ensureAuthenticated,
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      sign: Joi.string().max(20).required(),
      timestamp: Joi.date().required(),
      description: Joi.string().required(),
      photo: Joi.string().uuid().required(),
    },
  }),
  activitiesController.create,
);

export default activitiesRouter;
