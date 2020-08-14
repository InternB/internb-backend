import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import pdfGuide from '@config/uploadsConfig/pdf_guide';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureProfessorAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';

import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.use(ensureAuthenticated);

classesRouter.get('/discipline/:discipline_id', classesController.index);

classesRouter.post(
  '/',
  ensureProfessorAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().min(1).max(3),
      semester: Joi.string().length(6),
      total_students_enrolled: Joi.number().integer().min(1),
      discipline_id: Joi.string().min(5).max(10),
    },
  }),
  pdfGuide.upload.single('pdf_guide'),
  classesController.create,
);

export default classesRouter;
