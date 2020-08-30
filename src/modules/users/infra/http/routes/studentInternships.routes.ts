import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { ensureStudentAuthenticated } from '../middlewares/ensureRoleAuthenticated';

import StudentInternshipsController from '../controllers/StudentInternshipsController';

const internshipsRouter = Router();

const studentInternshipsController = new StudentInternshipsController();

internshipsRouter.use(ensureAuthenticated);

internshipsRouter.post(
  '/',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      class_id: Joi.string().required(),
      password: Joi.string().min(6).max(12).required(),
    },
  }),
  studentInternshipsController.create,
);

internshipsRouter.patch(
  '/:internship_id/school/:school_id',
  ensureStudentAuthenticated,
  studentInternshipsController.addSchool,
);

export default internshipsRouter;
