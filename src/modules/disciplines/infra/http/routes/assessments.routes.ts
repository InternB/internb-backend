import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import {
  ensurePreceptorAuthenticated,
  ensureProfessorAuthenticated,
} from '../../../../users/infra/http/middlewares/ensureRoleAuthenticated';
import AssessmentsController from '../controllers/AssessmentsController';

const assessmentsRouter = Router();

const assessmentsController = new AssessmentsController();

assessmentsRouter.use(ensureAuthenticated);

assessmentsRouter.post(
  '/',
  ensureAuthenticated,
  ensurePreceptorAuthenticated,
  assessmentsController.create,
);

export default assessmentsRouter;
