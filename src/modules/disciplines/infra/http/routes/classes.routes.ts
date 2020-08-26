import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import pdfGuide from '@config/uploadsConfig/PdfGuideUpload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureProfessorAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';

import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.use(ensureAuthenticated);

classesRouter.get('/discipline', classesController.index);

classesRouter.post(
  '/',
  ensureProfessorAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().min(1).max(3).required(),
      semester: Joi.string().length(6).required(),
      password: Joi.string().min(6).max(12).required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
      total_students_enrolled: Joi.number().integer().min(1),
      discipline_id: Joi.string().min(5).max(10),
    },
  }),
  classesController.create,
);

export default classesRouter;
