import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import pdfsUpload from '@config/uploadsConfig/PdfGuideUpload';
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
  '/preceptor/:preceptor_id',
  ensureStudentAuthenticated,
  internshipsController.registerInternToPreceptor,
);

internshipsRouter.patch(
  '/compromise/:internship_id',
  ensureStudentAuthenticated,
  pdfsUpload.upload.single('compromise'),
  internshipsController.uploadStudentCompromise,
);

internshipsRouter.patch(
  '/contract/:internship_id',
  ensureStudentAuthenticated,
  pdfsUpload.upload.fields([
    {
      name: 'firstCopy',
      maxCount: 1,
    },
    {
      name: 'secondCopy',
      maxCount: 1,
    },
    {
      name: 'thirdCopy',
      maxCount: 1,
    },
  ]),
  internshipsController.uploadStudentContract,
);

internshipsRouter.patch(
  '/work-plan/:internship_id',
  ensureStudentAuthenticated,
  pdfsUpload.upload.single('work-plan'),
  internshipsController.uploadStudentWorkPlan,
);

export default internshipsRouter;
