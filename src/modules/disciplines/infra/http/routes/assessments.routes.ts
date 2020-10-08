import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import {
  ensurePreceptorAuthenticated,
  // ensureProfessorAuthenticated,
} from '../../../../users/infra/http/middlewares/ensureRoleAuthenticated';
import AssessmentsController from '../controllers/AssessmentsController';

const assessmentsRouter = Router();

const assessmentsController = new AssessmentsController();

assessmentsRouter.use(ensureAuthenticated);

assessmentsRouter.post(
  '/',
  ensureAuthenticated,
  ensurePreceptorAuthenticated,
  celebrate({
    [Segments.BODY]: {
      internship_id: Joi.string().uuid().required(),
      ended: Joi.boolean().required(),
      class_plan: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(3)
        .required(),
      class_plan_comments: Joi.string().allow(''),
      content: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(4)
        .required(),
      content_comments: Joi.string().allow(''),
      class_experience: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(6)
        .required(),
      class_experience_comments: Joi.string().allow(''),
      methodology: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(4)
        .required(),
      methodology_comments: Joi.string().allow(''),
      didactic: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(6)
        .required(),
      didactic_comments: Joi.string().allow(''),
      evaluation: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(3)
        .required(),
      evaluation_comments: Joi.string().allow(''),
      communication: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(3)
        .required(),
      communication_comments: Joi.string().allow(''),
      general: Joi.array()
        .items(Joi.number().min(1).max(5))
        .length(6)
        .required(),
      general_comments: Joi.string().allow(''),
    },
  }),
  assessmentsController.create,
);

export default assessmentsRouter;
