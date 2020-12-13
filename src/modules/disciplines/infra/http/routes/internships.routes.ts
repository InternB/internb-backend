import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import {
  ensureStudentAuthenticated,
  ensureProfessorAuthenticated,
  ensurePreceptorAuthenticated,
} from '../../../../users/infra/http/middlewares/ensureRoleAuthenticated';

import InternshipsController from '../controllers/InternshipsController';
import ReportsController from '../controllers/ReportsController';

const internshipsRouter = Router();

const internshipsController = new InternshipsController();
const reportsController = new ReportsController();

internshipsRouter.use(ensureAuthenticated);

internshipsRouter.get(
  '/student',
  ensureStudentAuthenticated,
  internshipsController.studentInternships,
);

internshipsRouter.get(
  '/preceptor',
  ensurePreceptorAuthenticated,
  internshipsController.preceptorInternships,
);

internshipsRouter.get(
  '/reports/school-data/:professor_id',
  ensureProfessorAuthenticated,
  reportsController.school_data,
);

internshipsRouter.get(
  '/reports/classes-data/:professor_id',
  ensureProfessorAuthenticated,
  reportsController.classes_data,
);

internshipsRouter.get(
  '/reports/students-data/:professor_id',
  ensureProfessorAuthenticated,
  reportsController.students_data,
);

internshipsRouter.get(
  '/reports/students-schools-data/:professor_id',
  ensureProfessorAuthenticated,
  reportsController.students_schools_data,
);

internshipsRouter.get(
  '/reports/preceptors-data/:professor_id',
  ensureProfessorAuthenticated,
  reportsController.preceptors_data,
);

internshipsRouter.post(
  '/',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      class_id: Joi.string().required(),
      password: Joi.string().min(6).max(12).required(),
    },
  }),
  internshipsController.create,
);

internshipsRouter.patch(
  '/:id',
  ensureStudentAuthenticated,
  internshipsController.updateInternshipDates,
);

internshipsRouter.patch(
  '/:id/school/:school_id',
  ensureStudentAuthenticated,
  internshipsController.registerInternToSchool,
);

internshipsRouter.patch(
  '/:internship_id/preceptor/:preceptor_id',
  ensureStudentAuthenticated,
  internshipsController.registerInternToPreceptor,
);

internshipsRouter.patch(
  '/upload/compromises',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      internship_id: Joi.string().uuid().required(),
      compromise: Joi.string().uuid().required(),
    },
  }),
  internshipsController.uploadStudentCompromise,
);

internshipsRouter.patch(
  '/upload/contracts',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      internship_id: Joi.string().uuid().required(),
      first_copy: Joi.string().uuid().required(),
      second_copy: Joi.string().uuid().required(),
      third_copy: Joi.string().uuid().required(),
    },
  }),
  internshipsController.uploadStudentContract,
);

internshipsRouter.patch(
  '/upload/work-plans',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      internship_id: Joi.string().uuid().required(),
      work_plan: Joi.string().uuid().required(),
    },
  }),
  internshipsController.uploadStudentWorkPlan,
);

export default internshipsRouter;
