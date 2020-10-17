import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { ensureStudentAuthenticated } from '../../../../users/infra/http/middlewares/ensureRoleAuthenticated';
import CalendarsController from '../controllers/CalendarsController';

const calendarsRouter = Router();

const calendarsController = new CalendarsController();

calendarsRouter.use(ensureAuthenticated);

calendarsRouter.post(
  '/',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      internship_id: Joi.string().uuid().required(),
      starts_at: Joi.array().items(Joi.date()).length(5).required(),
      finishes_at: Joi.array().items(Joi.date()).length(5).required(),
    },
  }),
  calendarsController.create,
);

export default calendarsRouter;
